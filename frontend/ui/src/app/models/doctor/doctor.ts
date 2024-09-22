export default interface IDoctor extends Record<string, any> {
    id: number;
    firstName: string;
    secondName: string;
    firstLastName: string;
    secondLastName: string;
    email: string;
    phone: string;
    specialty: string;
}