import { TextInput, SimpleForm, Create } from "react-admin";
//TODO - try to delete the show button that appears once the record is created
// it navigates to the record page but the record is not created yet
export const NoteCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="owner" />
            <TextInput source="title" />
            <TextInput source="date" />
            <TextInput source="text" />
        </SimpleForm>
    </Create>
);