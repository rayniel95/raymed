import { NumberInput, TextInput, SelectInput, NumberField, TextField, SelectField } from "react-admin";


export function noteInputComponents() {
    return (
        <>
            <NumberInput source="id" />
            <NumberInput source="patientIdentifier" />
            <TextInput source="title" />
            <TextInput source="date" />
            <TextInput source="text" />
        </>
    )
}

export function noteShowComponents() {
    return (
        <>
            <NumberField source="id" />
            <NumberField source="patientIdentifier" />
            <TextField source="title" />
            <TextField source="date" />
            <TextField source="text" />
        </>
    )
}