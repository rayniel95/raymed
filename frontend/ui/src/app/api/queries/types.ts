export interface IQueryObject {
  id: string;
  tokenId: string;
  uri: string;
}

export interface IBaseQueryResult<T> {
  data: T;
  errors: any;
}

export interface IDrugExposureQueryResult {
    drugExposures: IQueryObject[]
}

export interface INoteQueryResult{
    notes: IQueryObject[]
}

export type TNoteQueryResult = IBaseQueryResult<INoteQueryResult>
export type TDrugExposureQueryResult = IBaseQueryResult<IDrugExposureQueryResult>