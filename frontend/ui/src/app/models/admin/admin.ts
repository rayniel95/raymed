import { RaRecord } from "react-admin";
import { BaseModel } from "../base";

export interface IAdmin extends BaseModel {
    firstName: string;
    secondName: string;
    firstLastName: string;
    secondLastName: string;
    email: string;
    phone: string;
}

export interface IAdminDashboard extends RaRecord, IAdmin {}