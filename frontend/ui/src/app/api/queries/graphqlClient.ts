import {execute, DrugExposureDocument, DrugExposureQuery, NoteQuery, NoteDocument} from '@/app/api/queries/.graphclient'
import { TDrugExposureQueryResult, TNoteQueryResult } from './types'

export async function drugExposureQuery(first: number, skip: number): Promise<TDrugExposureQueryResult> {
  return await execute<DrugExposureQuery>(DrugExposureDocument, {
  first, skip
  })
}

export async function noteQuery(first: number, skip: number): Promise<TNoteQueryResult> {
  return await execute<NoteQuery>(NoteDocument, {
    first, skip
  })
}