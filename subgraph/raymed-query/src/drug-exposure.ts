import {
  NftCreated,
  NftUpdated,
} from "../generated/DrugExposure/DrugExposure"
import {
  DrugExposure,
} from "../generated/schema"

export function handleNftMetadataUpdate(event: NftUpdated): void {
  let drugExposure = new DrugExposure(event.transaction.hash)
  drugExposure.tokenId = event.params.tokenId
  drugExposure.uri = event.params.newUri
  drugExposure.save()
}

export function handleNftMint(event: NftCreated): void {
  let drugExposure = new DrugExposure(event.transaction.hash)
  drugExposure.tokenId = event.params.tokenId
  drugExposure.uri = event.params.uri
  drugExposure.save()
}
