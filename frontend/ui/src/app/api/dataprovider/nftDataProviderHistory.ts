import { CreateParams, DataProvider, DeleteManyParams, DeleteParams, GetListParams, GetManyParams, GetManyReferenceParams, GetOneParams, QueryFunctionContext, RaRecord, UpdateManyParams, UpdateParams } from "react-admin";
import { UseClientReturnType, UseWalletClientReturnType } from "wagmi";
import { getHistory } from "./nftQueriesHelper";
import { Helia } from "helia";
import { BaseModel } from "@/app/models/base";


export default function nftHistoryDataProvider(
    mapper: Record<string, (arg0: number, arg1: number)=> Promise<any>>,
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
            const nfts= await getHistory<T1>(
                params.pagination?.page!, 
                params.pagination?.perPage!,
                mapper[resource],
                heliaNode
            )
            // console.log(result)
            return {
                data: nfts,
                // total: totalSupply?Number(totalSupply):undefined,
                // pageInfo: {
                //     hasNextPage: totalSupply?params.pagination?.page! < Number(totalSupply):undefined,
                //     hasPreviousPage: params.pagination?.page! > 1
                // }
            }
        }, // get a list of records based on sort, filter, and pagination
        getOne: async <T1 extends RaRecord>(
            resource: string, 
            params:GetOneParams
        ) => {
            const nfts = await getHistory<T1>(
                params.id!,
                1,
                mapper[resource],
                heliaNode
            )

            return {
                data: nfts[0]
            }
        }, // get a single record by id
        getMany: async <T1 extends RaRecord>(
            resource: string, 
            params: GetManyParams
        ) => {
            return Promise.reject(new Error(`Not implemented`))
        }, // get a list of records based on an array of ids
        getManyReference: async<T1 extends RaRecord>(
            resource: string,
            params: GetManyReferenceParams
        ) => {
            return Promise.reject(new Error(`Not implemented`))
        }, // get the records referenced to another record, e.g. comments for a post
        create: async <T1 extends BaseModel>(
            resource: string,
            params: CreateParams<T1>
        ) => {
            return Promise.reject(new Error(`Not implemented`))
        }, // create a record
        update: async <T1 extends RaRecord>(
            resource: string, 
            params: UpdateParams<T1>
        ) =>{
            return Promise.reject(new Error(`Not implemented`))
        }, // update a record based on a patch
        updateMany: async <T1 extends RaRecord>(
            resource: string, 
            params: UpdateManyParams<T1>
        ) => {
            return Promise.reject(new Error(`Not implemented`))
        }, // update a list of records based on an array of ids and a common patch
        delete: async <T1 extends RaRecord>(
            resource: string, 
            params: DeleteParams
        ) => {
            return Promise.reject(new Error(`Not implemented`))
        }, // delete a record by id
        deleteMany: async <T1 extends RaRecord>(
            resource: string, 
            params: DeleteManyParams
        ) => {
            return Promise.reject(new Error(`Not implemented`))
        }, // delete a list of records based on an array of ids
    }
}