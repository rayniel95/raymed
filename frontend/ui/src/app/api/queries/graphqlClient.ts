import {execute, DrugExposureDocument, DrugExposureQuery, NoteQuery, NoteDocument} from '@/app/api/queries/.graphclient'

export async function drugExposureQuery(first: number, skip: number) {
  return await execute<DrugExposureQuery>({
    query: DrugExposureDocument,
    variables: {first, skip},
  })
}

export async function noteQuery(first: number, skip: number) {
  return await execute<NoteQuery>({
    query: NoteDocument,
    variables: {first, skip},
  })
}