import { Routes } from "../routes"

export const mapper: Record<Routes, "0x{string}"> = {
    "admins": process.env.NEXT_PUBLIC_ADMIN_CONTRACT_ADDRESS! as "0x{string}",
    "doctors": process.env.NEXT_PUBLIC_DOCTOR_CONTRACT_ADDRESS! as "0x{string}",
    "patients": process.env.NEXT_PUBLIC_PATIENT_CONTRACT_ADDRESS! as "0x{string}",
    "drugExposures": process.env.NEXT_PUBLIC_DRUG_EXPOSURE_CONTRACT_ADDRESS! as "0x{string}",
    "notes": process.env.NEXT_PUBLIC_NOTE_CONTRACT_ADDRESS! as "0x{string}",
}