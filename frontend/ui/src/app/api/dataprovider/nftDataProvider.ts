import { CreateParams, DataProvider, DeleteManyParams, DeleteParams, Error, GetListParams, GetManyParams, GetManyReferenceParams, GetOneParams, HttpError, Identifier, QueryFunctionContext, RaRecord, UpdateManyParams, UpdateParams } from "react-admin";
import { UseClientReturnType, UseWalletClientReturnType } from "wagmi";
import { addTokenIdToMetadata, getMetadataForNft, getNfts, getNftsIndexed, getNftsUriForContract, getNftsWithTotalSupply, getNftTokenId, postMetadataForNft } from "./nftQueriesHelper";
import { getContract, erc721Abi, parseEventLogs } from 'viem'
import { Helia } from "helia";
import GenericNft from "./GenericNft.json";
import { BaseModel } from "@/app/models/base";
import { checkWalletConnection } from "@/app/blockchain/account";
import { transformModelToDashboard } from "./nftDataProviderHelper";
import { getClient, getTransaction, getTransactionReceipt } from "wagmi/actions";
import { config } from "@/app/blockchain/config";


export default function nftDataProvider(
    mapper: Record<string, "0x{string}">,
    publicClient: UseClientReturnType, //TODO - set the appropiate type from public client
    walletClient: UseWalletClientReturnType,
    heliaNode: Helia
): DataProvider {
    return {
        publicClient,
        walletClient,
        mapper,
        heliaNode,
        getList: async <T1 extends RaRecord>(
            resource: string, 
            params: GetListParams & QueryFunctionContext
        ) => {
            //TODO - fix generics, use the union type of all models
            const { totalSupply, nfts } = await getNftsWithTotalSupply<T1>(
                mapper[resource], 
                params.pagination?.perPage!, 
                params.pagination?.page! - 1, 
                publicClient!, 
                heliaNode
            )
            // console.log(result)
            return {
                data: addTokenIdToMetadata(
                    nfts, params.pagination?.page! - 1, 
                    params.pagination?.perPage!
                ),
                total: totalSupply?Number(totalSupply):undefined,
                pageInfo: {
                    hasNextPage: totalSupply?params.pagination?.page! < Number(totalSupply):undefined,
                    hasPreviousPage: params.pagination?.page! > 1
                }
            }
        }, // get a list of records based on sort, filter, and pagination
        getOne: async <T1 extends RaRecord>(
            resource: string, 
            params:GetOneParams
        ) => {
            const { nfts } = await getNftsWithTotalSupply<T1>(
                mapper[resource], 
                1, 
                params.id!,
                publicClient!, 
                heliaNode
            )
            return {
                data: nfts.map(function(value){
                    return transformModelToDashboard(
                        value, 
                        params.id!
                    )
                })[0]
            }
        }, // get a single record by id
        getMany: async <T1 extends RaRecord>(
            resource: string, 
            params: GetManyParams
        ) => {
            const nfts = await Promise.all(params.ids.map(async (id) => {
                const nftsUris = getNftsUriForContract(
                    publicClient!, 
                    mapper[resource], 
                    1, 
                    parseInt(id.toString())
                )
                const nfts = await Promise.all(nftsUris.map(async (uri) => {
                    const metadata = await getMetadataForNft<T1>(await uri)
                    return metadata
                }))
                return nfts[0]
            }))
            return{
                data: nfts
            }
        }, // get a list of records based on an array of ids
        getManyReference: async<T1 extends RaRecord>(
            resource: string,
            params: GetManyReferenceParams
        ) => {
            //NOTE - search for the owner of params.id in the current nft contract
            //and query the contract in resource for the nfts with the same owner
            const contract = getContract({
                address: mapper[resource],
                abi: GenericNft.abi,
                client: publicClient!
            })

            const ownerAddress = await contract.read.ownerOf([BigInt(params.id)]);
            const contractToQuery = getContract({
                address: resource as '0x{string}',
                abi: erc721Abi,
                client: publicClient!
            })

            const totalSupply = await contractToQuery.read.totalSupply();
            const nfts = [];
            for (let i = 0; i < totalSupply; i++) {
                nfts.push(contractToQuery.read.ownerOf([BigInt(i)]))
            }
            const nftsOwners = await Promise.all(nfts);
            const nftsOfOnwer = [];
            for(let i = 0; i < nftsOwners.length; i++){
                if (nftsOwners[i] === ownerAddress) {
                    const nft = async() => {
                        const nftsUris = getNftsUriForContract(
                            publicClient!,
                            resource as '0x{string}',
                            1,
                            i
                        )
                        const metadata = await getMetadataForNft<T1>(await nftsUris[0])
                        return metadata
                    }
                    nftsOfOnwer.push(nft())
                }
            }
            return {
                data: await Promise.all(nftsOfOnwer)
            }
        }, // get the records referenced to another record, e.g. comments for a post
        create: async <T1 extends BaseModel>(
            resource: string,
            params: CreateParams<T1>
        ) => {
            checkWalletConnection();
            const uri = postMetadataForNft(
                params.data, 
                heliaNode
            )
            const contract = getContract({
                address: mapper[resource],
                abi: GenericNft.abi,
                client: walletClient.data!
            })

            const mintResult = await contract.write.safeMint(
                [params.data.owner,await uri]
            )
            const tokenId = await getNftTokenId(mintResult)
            return {
                data: {id:tokenId as Identifier, ...params.data}
            }
        }, // create a record
        update: async <T1 extends RaRecord>(
            resource: string, 
            params: UpdateParams<T1>
        ) =>{
            checkWalletConnection()
            const uri = postMetadataForNft(
                {...params.data, ...params.previousData},
                heliaNode
            )
            const contract = getContract({
                address: mapper[resource],
                abi: GenericNft.abi,
                client: walletClient.data!
            })
            await contract.write.setTokenURI(
                [params.id.toString()],
                await uri
            )

            return {
                data: {...params.previousData, ...params.data}
            }
        }, // update a record based on a patch
        updateMany: async <T1 extends RaRecord>(
            resource: string, 
            params: UpdateManyParams<T1>
        ) => {
            //TODO - return an error here. this is not supported because
            //the contract does not support batch updates
            checkWalletConnection()
            return {
                data: params.ids
            }
        }, // update a list of records based on an array of ids and a common patch
        delete: async <T1 extends RaRecord>(
            resource: string, 
            params: DeleteParams
        ) => {
            checkWalletConnection()
            const contract = getContract({
                address: mapper[resource],
                abi: GenericNft.abi,
                client: walletClient.data!
            })
            await contract.write.burn(
                [parseInt(params.id.toString())]
            )

            return {
                data: params.previousData
            }
        }, // delete a record by id
        deleteMany: async <T1 extends RaRecord>(
            resource: string, 
            params: DeleteManyParams
        ) => {
            checkWalletConnection()
            //TODO - return an error here. this is not supported because
            //the contract does not support batch updates
            const contract = getContract({
                address: mapper[resource],
                abi: GenericNft.abi,
                client: walletClient.data!
            })
            await Promise.all(params.ids.map(async (id) => {
                return await contract.write.burn(
                    [parseInt(id.toString())]
                )
            }))
            return{
                data: params.ids
            }
        }, // delete a list of records based on an array of ids
    }
}