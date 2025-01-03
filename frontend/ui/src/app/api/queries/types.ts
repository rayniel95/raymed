import {NoteResolvers, DrugExposureResolvers} from '@/app/api/queries/.graphclient'


export interface IBaseQueryResult<T> {
  data: T;
  errors: any;
}

export interface IDrugExposureQueryResult {
    drugExposures: DrugExposureResolvers[]
}

export interface INoteQueryResult{
    notes: NoteResolvers[]
}

export type TNoteQueryResult = IBaseQueryResult<INoteQueryResult>
export type TDrugExposureQueryResult = IBaseQueryResult<IDrugExposureQueryResult>