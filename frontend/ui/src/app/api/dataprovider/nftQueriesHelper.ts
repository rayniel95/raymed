import { getContract, erc721Abi, Client, ContractFunctionExecutionError, ContractFunctionZeroDataError } from 'viem'
import { verifiedFetch } from '@helia/verified-fetch'
import { Helia } from 'helia';
import { unixfs } from '@helia/unixfs'
import { RaRecord } from 'react-admin';
import { CID } from 'multiformats/cid';
import { json } from '@helia/json'


export function getNftsUriForContract(
    client: Client, 
    contractAddress: '0x{string}', 
    pageSize: number, 
    page: number
) {
    const contract = getContract({
        address: contractAddress,
        abi: erc721Abi,
        client
    })

    const nftMetadataPerIndex = [];
    try {
        for (let i = page * pageSize; i < (page + 1) * pageSize; i++) {
            nftMetadataPerIndex.push(contract.read.tokenURI([BigInt(i)]))
        }
        return nftMetadataPerIndex
    } catch (error: any) {
        console.log(error.message)
        if (error instanceof ContractFunctionZeroDataError) {
            return []
        }
        throw error;
    }
}

//TODO - union type of all models
// export async function getMetadataForNft<T extends RaRecord>(uri: string): Promise<T> {
//     const resp = await verifiedFetch(uri, {
//         headers: {
//             accept: 'application/json'
//         },
//     })
//     const json = await resp.json()
//     console.log(json)
//     return json
// }

// export async function getMetadataForNft2(
//     uri: string, 
//     heliaNode: Helia
// ){
//     const fs2 = unixfs(heliaNode)

//     // this decoder will turn Uint8Arrays into strings
//     const decoder = new TextDecoder()
//     let text = ''
    
//     // read the file from the blockstore using the second Helia node
//     for await (const chunk of fs2.cat(CID.parse(uri.slice(7)))) {
//       text += decoder.decode(chunk, {
//         stream: true
//       })
//     }
//     return JSON.parse(text)
// }

export async function getMetadataForNft(
    uri: string, 
    heliaNode: Helia
){
    const j = json(heliaNode)
    const obj = await j.get(CID.parse(uri.slice(7)))
    return obj
}

export async function postMetadataForNft(
    metadata: object, 
    heliaNode: Helia
){
    const fs = unixfs(heliaNode)
    // we will use this TextEncoder to turn strings into Uint8Arrays
    const encoder = new TextEncoder()
    console.log(metadata)
    // add the bytes to your node and receive a unique content identifier
    const cid = await fs.addBytes(encoder.encode(JSON.stringify(metadata)))

    return cid.toString()
}

    return cid.toString()
}