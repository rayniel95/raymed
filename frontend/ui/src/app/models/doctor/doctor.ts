import { RaRecord } from "react-admin";
import { IAdmin } from "../admin/admin";

export interface IDoctor extends IAdmin {
    specialty: string;
}

export interface IDoctorDashboard extends RaRecord, IDoctor {}

export const doctorSpecialty = [
    { id: 'general', name: 'General' },
    { id: 'surgery', name: 'Surgery' },
    { id: 'pediatrics', name: 'Pediatrics' },
    { id: 'internalMedicine', name: 'Internal Medicine' },
    { id: 'neurology', name: 'Neurology' },
    { id: 'psychiatry', name: 'Psychiatry' },
    { id: 'oncology', name: 'Oncology' },
    { id: 'cardiology', name: 'Cardiology' },
    { id: 'dermatology', name: 'Dermatology' },
    { id: 'emergency', name: 'Emergency' },
    { id: 'endocrinology', name: 'Endocrinology' },
    { id: 'gastroenterology', name: 'Gastroenterology' },
    { id: 'geriatrics', name: 'Geriatrics' },
    { id: 'gynecology', name: 'Gynecology' },
    { id: 'hematology', name: 'Hematology' },
    { id: 'infectiousDisease', name: 'Infectious Disease' },
    { id: 'nephrology', name: 'Nephrology' },
];