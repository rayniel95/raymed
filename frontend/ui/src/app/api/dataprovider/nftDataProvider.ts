import { Alchemy } from "alchemy-sdk";
import { DataProvider } from "react-admin";
import { UseClientReturnType, UseWalletClientReturnType } from "wagmi";
import { getMetadataForNft, getNftsForContract, postMetadataForNft } from "./nftQueriesHelper";
import { getContract, erc721Abi } from 'viem'
import { HeliaLibp2p } from "helia";


export default function nftDataProvider(
    contractAddress: '0x{string}',
    publicClient: UseClientReturnType, //TODO - set the appropiate type from public client
    walletClient: UseWalletClientReturnType,
    nftClient: Alchemy,
    heliaNode: HeliaLibp2p
): DataProvider {
    return {
        publicClient,
        walletClient,
        contractAddress,
        nftClient,
        heliaNode,
        getList: async (resource, params) => {
            const nftsUris = getNftsForContract(
                publicClient!, 
                contractAddress, 
                params.pagination?.perPage!, 
                params.pagination?.page!
            )
            const nfts = await Promise.all(nftsUris.map(async (uri) => {
                const metadata = await getMetadataForNft(await uri)
                return { //TODO - use the model here
                    id: metadata.id,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image,
                    attributes: metadata.attributes,
                    contractAddress: metadata.contractAddress,
                    tokenId: metadata.tokenId,
                    uri: uri
                }
            }))
            return {
                data: nfts
            }
        }, // get a list of records based on sort, filter, and pagination
        getOne: async (resource, params) => {
            const nftsUris = getNftsForContract(
                publicClient!, 
                contractAddress, 
                1, 
                parseInt(params.id.toString())
            )
            const nfts = await Promise.all(nftsUris.map(async (uri) => {
                const metadata = await getMetadataForNft(await uri)
                return { //TODO - use the model here
                    id: metadata.id,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image,
                    attributes: metadata.attributes,
                    contractAddress: metadata.contractAddress,
                    tokenId: metadata.tokenId,
                    uri: uri
                }
            }))
            return {
                data: nfts[0]
            }
        }, // get a single record by id
        getMany: (resource, params) => {
            return Promise.all(params.ids.map(async (id) => {
                const nftsUris = getNftsForContract(
                    publicClient!, 
                    contractAddress, 
                    1, 
                    parseInt(id.toString())
                )
                const nfts = await Promise.all(nftsUris.map(async (uri) => {
                    const metadata = await getMetadataForNft(await uri)
                    return { //TODO - use the model here
                        id: metadata.id,
                        name: metadata.name,
                        description: metadata.description,
                        image: metadata.image,
                        attributes: metadata.attributes,
                        contractAddress: metadata.contractAddress,
                        tokenId: metadata.tokenId,
                        uri: uri
                    }
                }))
                return {
                    data: nfts[0]
                }
            }))
        }, // get a list of records based on an array of ids
        getManyReference: async(resource, params) => {
            //NOTE - search for the owner of params.id in the current nft contract
            //and query the contract in resource for the nfts with the same owner
            const contract = getContract({
                address: contractAddress,
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
            const nftsOfOnwer = nftsOwners.filter(owner => owner === ownerAddress)
            return {
                data: nftsOfOnwer
            }
        }, // get the records referenced to another record, e.g. comments for a post
        create: async(resource, params) => {
            const uri = postMetadataForNft(
                params.data, 
                heliaNode
            )
            const contract = getContract({
                address: contractAddress,
                abi: erc721Abi,
                client: publicClient!
            })

            return contract.write.safeMint(
                params.data.name, 
                params.data.description, 
                params.data.image, 
                params.data.attributes
            )
        }, // create a record
        update: (resource, params) => Promise, // update a record based on a patch
        updateMany: (resource, params) => Promise, // update a list of records based on an array of ids and a common patch
        delete: (resource, params) => Promise, // delete a record by id
        deleteMany: (resource, params) => Promise, // delete a list of records based on an array of ids
    }
}