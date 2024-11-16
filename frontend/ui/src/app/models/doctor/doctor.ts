import { RaRecord } from "react-admin";
import { IAdmin } from "../admin/admin";

export interface IDoctor extends IAdmin {
    specialty: string;
}

export interface IDoctorDashboard extends RaRecord, IDoctor {}