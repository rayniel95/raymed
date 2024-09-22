export default interface INote extends Record<string, any> {
    id: number;
    patientIdentifier: number;
    title: string;
    date: string;    
    text: string;
}