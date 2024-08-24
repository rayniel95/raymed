import { List, Datagrid, TextField, NumberField, SelectField, Show, SimpleShowLayout } from "react-admin";
//TODO - add relations between resources
export const NoteShow = () => (
    <Show>
        <SimpleShowLayout>
            <NumberField source="id" />
            <NumberField source="patientIdentifier" />
            <TextField source="title" />
            <TextField source="date" />
            <TextField source="text" />
        </SimpleShowLayout>
    </Show>
);