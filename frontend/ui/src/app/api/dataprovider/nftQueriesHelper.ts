import { getContract, erc721Abi, Client, ContractFunctionExecutionError, ContractFunctionZeroDataError, Abi, parseEventLogs } from 'viem'
import { Helia } from 'helia';
import { CID } from 'multiformats/cid';
import { json } from '@helia/json'
import { UseClientReturnType } from 'wagmi';
import { config } from '@/app/blockchain/config';
import { getTransactionReceipt } from 'wagmi/actions';
import { transformModelToDashboard } from './nftDataProviderHelper';


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
        // console.log(error.message)
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
    let obj: T1 | undefined = undefined;
    try {
            obj = await j.get(
            CID.parse(uri.slice(7)), 
            {signal: AbortSignal.timeout(10000)}
        )
    } catch (error) {
        //TODO - if the error is 404 return undefined but throw in other case
    }
    return obj as T1
}

export async function postMetadataForNft(
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
                    // console.log(uri)
                    //TODO - there is a cross origin error of cross origin header
                    //missing. once the metadata is stored in the chain the helia 
                    //upload the data to ipfs. but when it try to get the metadata
                    //from ipfs it will fail because of the cross origin header. this
                    //is an error related to network connectivity configuration. the
                    //solution is to create a ipfs private network. so, let this be
                    //and use the local storage to store the metadata. add a timeout
                    //to promise that try to get the metadata that is not in the
                    //local storage to avoid waiting too long for the metadata.
                    const metadata = await getMetadataForNft<T1>(uri, heliaNode)
                    // console.log(metadata)
                    return metadata
                } catch (error) {
                    // console.log(error)
                    return null
                }
            })
        )
        nftsPromises.forEach(element => {
            // console.log(element)
            if (element.status === 'fulfilled' && element.value !== null) {
                nfts.push(element.value)
            }
        });
        // console.log(nfts)
        return nfts
    } catch (e: any) {
        //TODO - show pretty error message in the UI
        // console.log(e)
        return []
    }
}

export async function getNftsWithTotalSupply<T1>(
    contractAddress: '0x{string}',
    pageSize: number, 
    page: number,
    publicClient: UseClientReturnType, //TODO - set the appropiate type from public client
    heliaNode: Helia
){
    const contract = getContract({
        address: contractAddress,
        abi:erc721Abi,
        client: publicClient!
    })

    const result = await Promise.allSettled([
        getNfts<T1>(
            contractAddress, 
            pageSize, 
            page, 
            publicClient!, 
            heliaNode
        ),
        contract.read.totalSupply()
    ])
    const nfts = result[0].status==='fulfilled'? result[0].value as T1[] : [];
    const totalSupply = result[1].status==='fulfilled' ? result[1].value as bigint: undefined;
    return { totalSupply, nfts };
}

export async function getNftTokenId(txHash:`0x${string}`){
    const result = await getTransactionReceipt(config, {
        hash: txHash
    })
    const event = parseEventLogs({logs: result.logs, abi: erc721Abi})
    return Number(
        (event[0].args as {
            from: `0x${string}`;
            to: `0x${string}`;
            tokenId: bigint;
        }).tokenId
    )
}

export function addTokenIdToMetadata<T1>(
    nfts: T1[],
    page: number,
    pageSize: number
){
    return nfts.map(function(value, index){
        return transformModelToDashboard(
            value, 
            page * pageSize + index
        )
    }).filter(function(value){
        return Object.keys(value).length > 1
    })
}

export async function getNftsIndexed<T1>(
    contractAddress: '0x{string}',
    indexes: number[],
    publicClient: UseClientReturnType, //TODO - set the appropiate type from public client
    heliaNode: Helia
){
    console.log(contractAddress, indexes)
    const result = await Promise.allSettled(
        indexes.map(function(index){
            return getNfts<T1>(
                contractAddress, 
                1, 
                index, 
                publicClient!, 
                heliaNode
            )
        })
    )
    const nfts = result[0].status==='fulfilled'? result[0].value as T1[] : [];
    return { nfts };
}

export async function queryNftByOwner<T1>(
    targetContractAddress: '0x{string}',
    owner: `0x${string}`,
    publicClient: UseClientReturnType, //TODO - set the appropiate type from public client
    heliaNode: Helia
)
{
    const contractToQuery = getContract({
        address: targetContractAddress,
        abi: erc721Abi,
        client: publicClient!
    })
    
    const totalSupply = await contractToQuery.read.totalSupply();
    const nfts = [];
    for (let i = 0; i < totalSupply; i++) {
        nfts.push(contractToQuery.read.ownerOf([BigInt(i)]))
    }
    const allOwners = await Promise.allSettled(nfts);
    const nftsOfOnwer = [];
    const idsOfOwner = [];
    
    for(let i = 0; i < allOwners.length; i++){
        if (allOwners[i].status === 'fulfilled' && (allOwners[i] as PromiseFulfilledResult<string>).value === owner) {
            const nft = async function() {
                const nftsUris = getNftsUriForContract(
                    publicClient!,
                    targetContractAddress,
                    1,
                    i
                )
                const metadata = await getMetadataForNft<T1>(await nftsUris[0], heliaNode)
                return metadata
            }
            nftsOfOnwer.push(nft())
            idsOfOwner.push(i)
        }
    }
    const allNfts = await Promise.allSettled(nftsOfOnwer);

    const nftsOfOnwerWithId = [];
    for(let i = 0; i < allNfts.length; i++){
        if (allNfts[i].status === 'fulfilled') {
            const nft = (allNfts[i] as PromiseFulfilledResult<T1>).value;
            nftsOfOnwerWithId.push({id: idsOfOwner[i], ...nft})
        }
    }
    return nftsOfOnwerWithId;
}

// TODO - fix the type of the function
export async function getHistory<T1>(
    page: number, 
    pageSize: number,
    query: (arg0: number, arg1: number)=>Promise<any>,
    heliaNode: Helia
): Promise<any[]>{
    const nfts: any[] = []
    const entityResponse = await query(pageSize, (page - 1) * pageSize);
    const nftsPromises = await Promise.allSettled(
        entityResponse.map(async function(entity: any):Promise<T1|null> {
            try {
                const uri = entity.uri;
                const metadata = await getMetadataForNft<T1>(uri, heliaNode)
                // console.log(metadata)
                return metadata
            } catch (error) {
                // console.log(error)
                return null
            }
        })
    )
    nftsPromises.forEach(function(element: any) {
        // console.log(element)
        if (element.status === 'fulfilled' && element.value !== null) {
            nfts.push(element.value)
        }
    });
    return nfts
}