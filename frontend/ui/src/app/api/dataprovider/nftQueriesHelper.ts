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

export async function getNfts<T1>(
    contractAddress: '0x{string}',
    pageSize: number, 
    page: number,
    publicClient: UseClientReturnType, //TODO - set the appropiate type from public client
    heliaNode: Helia
){
    let nfts: T1[] = [];
    try{
        const nftsUris = getNftsUriForContract(
            publicClient!,
            contractAddress, 
            pageSize,
            page
        )
        const nftsPromises = await Promise.allSettled(
            nftsUris.map(async function(uriPromise):Promise<T1|null> {
                try {
                    const uri = await uriPromise;
                    console.log(uri)
                    //TODO - there is a cross origin error of cross origin header
                    //missing. once the metadata is stored in the chain the helia 
                    //upload the data to ipfs. but when it try to get the metadata
                    //from ipfs it will fail because of the cross origin header
                    const metadata = await getMetadataForNft<T1>(uri, heliaNode)
                    console.log(metadata)
                    return metadata
                } catch (error) {
                    console.log(error)
                    return null
                }
            })
        )
        nftsPromises.forEach(element => {
            console.log(element)
            if (element.status === 'fulfilled' && element.value !== null) {
                nfts.push(element.value)
            }
        });
        console.log(nfts)
        return nfts
    } catch (e: any) {
        //TODO - show pretty error message in the UI
        console.log(e)
        return []
    }
}

}