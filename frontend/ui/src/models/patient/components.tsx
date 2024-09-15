import { NumberInput, TextInput, SelectInput, NumberField, TextField, SelectField } from "react-admin";


export function patientInputComponents() {
    return (
        <>
            <NumberInput source="id" />
            <TextInput source="firstName" />
            <TextInput source="secondName" />
            <TextInput source="firstLastName" />
            <TextInput source="secondLastName" />
            <NumberInput source="yearOfBirth" />
            <NumberInput source="monthOfBirth" />
            <NumberInput source="dayOfBirth" />
            <SelectInput source="ethnicity" />
            <SelectInput source="gender" />
        </>
    )
}

export function patientShowComponents() {
    return (
        <>
            <NumberField source="id" />
            <TextField source="firstName" />
            <TextField source="secondName" />
            <TextField source="firstLastName" />
            <TextField source="secondLastName" />
            <NumberField source="yearOfBirth" />
            <NumberField source="monthOfBirth" />
            <NumberField source="dayOfBirth" />
            <SelectField source="ethnicity" />
            <SelectField source="gender" />
        </>
    )
}