import { getContract, erc721Abi, Client, ContractFunctionExecutionError, ContractFunctionZeroDataError, Abi, parseEventLogs } from 'viem'
import { Helia } from 'helia';
import { unixfs } from '@helia/unixfs'
import { CID } from 'multiformats/cid';
import { json } from '@helia/json'
import { UseClientReturnType } from 'wagmi';
import { config } from '@/app/blockchain/config';
import { getTransactionReceipt } from 'wagmi/actions';


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
    try {//TODO - this try/catch is not necessary
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

export async function getMetadataForNft<T1>(
    uri: string, 
    heliaNode: Helia
){
    const j = json(heliaNode)
    const obj = await j.get(CID.parse(uri.slice(7)))
    return obj as T1
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
//TODO - use this function instead that previous one
export async function postMetadataForNft2(
    metadata: any, 
    heliaNode: Helia
){
    const j = json(heliaNode)

    const cid = await j.add(metadata)
    return cid.toString()
}

}