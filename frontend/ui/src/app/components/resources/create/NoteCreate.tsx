import { NumberInput, TextInput, SimpleForm, Create } from "react-admin";
//TODO - add relations between resources
export const NoteCreate = () => (
    <Create>
        <SimpleForm>
            <NumberInput source="id" InputProps={{ disabled: true }} />
            <NumberInput source="patientIdentifier" />
            <TextInput source="title" />
            <TextInput source="date" />
            <TextInput source="text" />
        </SimpleForm>
    </Create>
);