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

export const patientEthnicity = [
    { id: 'african', name: 'African' },
    { id: 'asian', name: 'Asian' },
    { id: 'caucasian', name: 'Caucasian' },
    { id: 'hispanic', name: 'Hispanic' },
    { id: 'middleEastern', name: 'Middle Eastern' },
    { id: 'nativeAmerican', name: 'Native American' },
    { id: 'pacificIslander', name: 'Pacific Islander' },
    { id: 'white', name: 'White' },
];

export const patientGender = [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },
    { id: 'other', name: 'Other' },
];