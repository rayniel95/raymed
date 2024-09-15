import { getContract, erc721Abi, Client } from 'viem'
import { verifiedFetch } from '@helia/verified-fetch'


export function getNftsForContract(
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
export async function getMetadataForNft(uri: string){
    const resp = await verifiedFetch(uri, {
        headers: {
          accept: 'application/json'
        }
      })
    const json = await resp.json()
    return json
}

