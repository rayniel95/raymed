import { BaseModel } from "../base";

export default interface IDrugExposure extends BaseModel {
    type: string;
    startDate: string;
    endDate: string;
    daysSupply: number;
    lotNumber: number;    
    stopReason: string;
}