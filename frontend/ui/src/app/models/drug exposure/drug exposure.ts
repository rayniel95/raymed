export default interface IDrugExposure extends Record<string, any> {
    id: number;
    patientIdentifier: number;
    type: string;
    startDate: string;
    endDate: string;
    daysSupply: number;
    lotNumber: number;    
    stopReason: string;
}