import { RaRecord } from "react-admin";
import { BaseModel } from "../base";

export interface IPatient extends BaseModel {   
    firstName: string;
    secondName: string;
    firstLastName: string;
    secondLastName: string;
    yearOfBirth: number;
    monthOfBirth: number;
    dayOfBirth: number;
    ethnicity: string;
    gender: string;
}

export interface IPatientDashboard extends RaRecord, IPatient {}