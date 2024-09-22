import { CreateParams, DataProvider, DeleteManyParams, DeleteParams, GetListParams, GetManyParams, GetManyReferenceParams, GetOneParams, QueryFunctionContext, RaRecord, UpdateManyParams, UpdateParams } from "react-admin";
import { UseClientReturnType, UseWalletClientReturnType } from "wagmi";
import { getMetadataForNft, getNftsUriForContract, postMetadataForNft } from "./nftQueriesHelper";
import { getContract, erc721Abi } from 'viem'
import { HeliaLibp2p } from "helia";
import GenericNft from "./GenericNft.json";
import { BaseModel } from "@/app/models/base";


export default function nftDataProvider<T extends RaRecord>(
    mapper: Record<string, "0x{string}">,
    publicClient: UseClientReturnType, //TODO - set the appropiate type from public client
    walletClient: UseWalletClientReturnType,
    heliaNode: HeliaLibp2p
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
            const contract = getContract({
                address: mapper[resource],
                abi: erc721Abi,
                client: publicClient!
            })

            const nftsUris = getNftsUriForContract(
                publicClient!, 
                mapper[resource], 
                params.pagination?.perPage!, 
                params.pagination?.page! - 1
            )
            const nfts = await Promise.all(nftsUris.map(async (uri) => {
                const metadata = await getMetadataForNft<T1>(await uri)
                return metadata;
            }))
            const totalSupply = await contract.read.totalSupply();

            return {
                data: nfts,
                total: Number(totalSupply),
                pageInfo: {
                    hasNextPage: params.pagination?.page! < totalSupply,
                    hasPreviousPage: params.pagination?.page! > 1
                }
            }
        }, // get a list of records based on sort, filter, and pagination
        getOne: async <T1 extends RaRecord>(
            resource: string, 
            params:GetOneParams
        ) => {
            const nftsUris = getNftsUriForContract(
                publicClient!, 
                mapper[resource], 
                1, 
                parseInt(params.id.toString())
            )
            const nfts = await Promise.all(nftsUris.map(async (uri) => {
                const metadata = await getMetadataForNft<T1>(await uri)
                return metadata
            }))
            return {
                data: nfts[0]
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
            const uri = postMetadataForNft(
                params.data, 
                heliaNode
            )
            const contract = getContract({
                address: mapper[resource],
                abi: GenericNft.abi,
                client: walletClient.data!
            })

            await contract.write.safeMint(
                [params.data.owner],
                await uri
            )

            return {
                data: params.data as T1
            }
        }, // create a record
        update: async <T1 extends RaRecord>(
            resource: string, 
            params: UpdateParams<T1>
        ) =>{
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
            return {
                data: params.ids
            }
        }, // update a list of records based on an array of ids and a common patch
        delete: async <T1 extends RaRecord>(
            resource: string, 
            params: DeleteParams
        ) => {
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