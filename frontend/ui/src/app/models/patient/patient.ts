export default interface IPatient extends Record<string, any> {
    id: number;
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