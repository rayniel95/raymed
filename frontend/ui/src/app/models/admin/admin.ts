import { RaRecord } from "react-admin";


export interface IAdmin {
    owner: string;
    firstName: string;
    secondName: string;
    firstLastName: string;
    secondLastName: string;
    email: string;
    phone: string;
}

export interface IAdminDashboard extends RaRecord, IAdmin {}