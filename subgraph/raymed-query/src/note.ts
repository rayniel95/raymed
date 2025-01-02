import {
    NftCreated,
    NftUpdated,
  } from "../generated/Note/DrugExposure"
  import {
    Note,
  } from "../generated/schema"
  
  export function handleNftMetadataUpdate(event: NftUpdated): void {
    let note = new Note(event.transaction.hash)
    note.tokenId = event.params.tokenId
    note.uri = event.params.newUri
    note.save()
  }
  
  export function handleNftMint(event: NftCreated): void {
    let note = new Note(event.transaction.hash)
    note.tokenId = event.params.tokenId
    note.uri = event.params.uri
    note.save()
  }
  