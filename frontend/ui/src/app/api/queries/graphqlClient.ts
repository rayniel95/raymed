import {execute, DrugExposureDocument, DrugExposureQuery, NoteQuery, NoteDocument} from '@/app/api/queries/.graphclient'

export async function drugExposureQuery(first: number, skip: number) {
  return await execute<DrugExposureQuery>(DrugExposureDocument, {
  first, skip
  })
}

export async function noteQuery(first: number, skip: number) {
  return await execute<NoteQuery>(NoteDocument, {
    first, skip
  })
}