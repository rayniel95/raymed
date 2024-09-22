import { NumberInput, TextInput, SelectInput, NumberField, TextField, SelectField } from "react-admin";


export function drugExposureInputComponents() {
    return (
        <>
            <NumberInput source="id" />
            <TextInput source="patientIdentifier" />
            <TextInput source="type" />
            <TextInput source="startDate" />
            <TextInput source="endDate" />
            <NumberInput source="daysSupply" />
            <NumberInput source="lotNumber" />
            <TextInput source="stopReason" />
        </>
    )
}

export function drugExposureShowComponents() {
    return (
        <>
            <NumberField source="id" />
            <TextField source="patientIdentifier" />
            <TextField source="type" />
            <TextField source="startDate" />
            <TextField source="endDate" />
            <NumberField source="daysSupply" />
            <NumberField source="lotNumber" />
            <TextField source="stopReason" />
        </>
    )
}