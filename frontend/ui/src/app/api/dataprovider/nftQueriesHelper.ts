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

