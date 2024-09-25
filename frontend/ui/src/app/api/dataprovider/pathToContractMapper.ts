export const mapper = {
    "admin": process.env.NEXT_PUBLIC_ADMIN_CONTRACT_ADDRESS! as "0x{string}",
    "doctor": process.env.NEXT_PUBLIC_DOCTOR_CONTRACT_ADDRESS! as "0x{string}",
    "patient": process.env.NEXT_PUBLIC_PATIENT_CONTRACT_ADDRESS! as "0x{string}",
    "drugExposure": process.env.NEXT_PUBLIC_DRUG_EXPOSURE_CONTRACT_ADDRESS! as "0x{string}",
    "note": process.env.NEXT_PUBLIC_NOTE_CONTRACT_ADDRESS! as "0x{string}",
}