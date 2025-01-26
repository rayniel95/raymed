import { CreateParams, DataProvider, DeleteManyParams, DeleteParams, Error, GetListParams, GetManyParams, GetManyReferenceParams, GetOneParams, HttpError, Identifier, QueryFunctionContext, RaRecord, UpdateManyParams, UpdateParams } from "react-admin";
import { UseClientReturnType, UseWalletClientReturnType } from "wagmi";
import { addTokenIdToMetadata, getMetadataForNft, getNfts, getNftsIndexed, getNftsUriForContract, getNftsWithTotalSupply, getNftTokenId, postMetadataForNft, queryNftByOwner } from "./nftQueriesHelper";
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
            const { nfts } = await getNftsIndexed<T1>(
                mapper[resource], 
                [params.id!],
                publicClient!, 
                heliaNode
            )
            return {
                data: addTokenIdToMetadata(
                    nfts, 
                    params.id!, 
                    1
                )[0]
            }
        }, // get a single record by id
        getMany: async <T1 extends RaRecord>(
            resource: string, 
            params: GetManyParams
        ) => {
            const ids = params.ids! as number[]
            const {nfts} = await getNftsIndexed<T1>(
                mapper[resource], 
                ids,
                publicClient!, 
                heliaNode
            )
            return{
                data: nfts.map(function(nft, index){
                    return transformModelToDashboard(
                        nft, 
                        ids[index]
                    )
                })
            }
        }, // get a list of records based on an array of ids
        getManyReference: async<T1 extends RaRecord>(
            resource: string,
            params: GetManyReferenceParams
        ) => {
            console.log(resource, params)
            const nfts = await queryNftByOwner<T1>(
                mapper[resource],
                params.id.toString() as `0x${string}`,
                publicClient!, 
                heliaNode
            )
            return {
                data: nfts,
                total: nfts.length
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
            // const tokenId = await getNftTokenId(mintResult)
            return { //TODO - this need to be fixed, try to look for the id of the token
                // this can be solved query the state and getting the total number of tokens
                // in the get list result. if using the 0 index the token 0 is shown
                // that means that this token is stored in the state.
                data: {id:0, ...params.data} as any
            }
        }, // create a record
        update: async <T1 extends RaRecord>(
            resource: string, 
            params: UpdateParams<T1>
        ) =>{
            checkWalletConnection()
            const uri = postMetadataForNft(
                {...params.previousData, ...params.data},
                heliaNode
            )
            const contract = getContract({
                address: mapper[resource],
                abi: GenericNft.abi,
                client: walletClient.data!
            })
            await contract.write.setTokenURI(
                [params.id.toString(), await uri]
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