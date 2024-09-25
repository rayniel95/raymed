import { getContract, erc721Abi, Client } from 'viem'
import { verifiedFetch } from '@helia/verified-fetch'
import { Helia } from 'helia';
import { unixfs } from '@helia/unixfs'
import { RaRecord } from 'react-admin';


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
    for (let i = page * pageSize; i < (page + 1) * pageSize; i++) {
        nftMetadataPerIndex.push(contract.read.tokenURI([BigInt(i)]))
    }
    return nftMetadataPerIndex
}

//TODO - union type of all models
export async function getMetadataForNft<T extends RaRecord>(uri: string): Promise<T> {
    const resp = await verifiedFetch(uri, {
        headers: {
          accept: 'application/json'
        }
      })
    const json = await resp.json()
    return json
}

export async function postMetadataForNft(
    metadata: object, 
    heliaNode: Helia
){
    const fs = unixfs(heliaNode)
    // we will use this TextEncoder to turn strings into Uint8Arrays
    const encoder = new TextEncoder()
    // add the bytes to your node and receive a unique content identifier
    const cid = await fs.addBytes(encoder.encode(JSON.stringify(metadata)))

    return cid.toString()
}