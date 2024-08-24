import { NumberInput, TextInput, SimpleForm, Edit } from "react-admin";
//TODO - add relations between resources
export const NoteEdit = () => (
    <Edit>
        <SimpleForm>
            <NumberInput source="id" InputProps={{ disabled: true }} />
            <NumberInput source="patientIdentifier" InputProps={{ disabled: true }} />
            <TextInput source="title" />
            <TextInput source="date" />
            <TextInput source="text" />
        </SimpleForm>
    </Edit>
);