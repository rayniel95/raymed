import { NumberInput, TextInput, SelectInput, NumberField, TextField, SelectField, EmailField } from "react-admin";


export function doctorInputComponents() {
    return (
        <>
            <NumberInput source="id" />
            <TextInput source="firstName" />
            <TextInput source="secondName" />
            <TextInput source="firstLastName" />
            <TextInput source="secondLastName" />
            <SelectInput source="specialty" />
            <TextInput source="email" />
            <TextInput source="phone" />
        </>
    )
}

export function doctorShowComponents() {
    return (
        <>
            <NumberField source="id" />
            <TextField source="firstName" />
            <TextField source="secondName" />
            <TextField source="firstLastName" />
            <TextField source="secondLastName" />
            <SelectField source="specialty" />
            <EmailField source="email" />
            <TextField source="phone" />
        </>
    )
}