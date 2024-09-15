import { Alchemy } from "alchemy-sdk";
import { DataProvider } from "react-admin";
import { UseWalletClientReturnType } from "wagmi";

export default function nftDataProvider(
    contractAddress: string,
    // publicClient: UseClientReturnType, //TODO - set the appropiate type from public client
    walletClient: UseWalletClientReturnType,
    nftClient: Alchemy
): DataProvider {
    return {
        // publicClient,
        walletClient,
        contractAddress,
        nftClient,
        getList: async (resource, params) => {
            return await nftClient.nft.getNftsForContract(
                contractAddress, 
                {
                    omitMetadata: false,
                    pageSize: params.pagination!.perPage
                }
            )
        }, // get a list of records based on sort, filter, and pagination
        getOne: async (resource, params) => {
            return {
                data: await nftClient.nft.getNftMetadata(contractAddress, params.id)
            }
        }, // get a single record by id
        getMany: (resource, params) => Promise, // get a list of records based on an array of ids
        getManyReference: (resource, params) => Promise, // get the records referenced to another record, e.g. comments for a post
        create: (resource, params) => Promise, // create a record
        update: (resource, params) => Promise, // update a record based on a patch
        updateMany: (resource, params) => Promise, // update a list of records based on an array of ids and a common patch
        delete: (resource, params) => Promise, // delete a record by id
        deleteMany: (resource, params) => Promise, // delete a list of records based on an array of ids
    }
}