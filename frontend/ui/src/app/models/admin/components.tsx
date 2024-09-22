import { NumberInput, TextInput, SelectInput, NumberField, TextField, SelectField } from "react-admin";


export function adminInputComponents() {
    return (
        <>
            <NumberInput source="id" />
            <TextInput source="firstName" />
            <TextInput source="secondName" />
            <TextInput source="firstLastName" />
            <TextInput source="secondLastName" />
            <TextInput source="email" />
            <TextInput source="phone" />
        </>
    )
}

export function adminShowComponents() {
    return (
        <>
            <NumberField source="id" />
            <TextField source="firstName" />
            <TextField source="secondName" />
            <TextField source="firstLastName" />
            <TextField source="secondLastName" />
            <TextField source="email" />
            <TextField source="phone" />
        </>
    )
}