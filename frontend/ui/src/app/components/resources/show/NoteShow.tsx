import { TextField, NumberField, Show, SimpleShowLayout, ReferenceField } from "react-admin";
//TODO - add relations between resources
export const NoteShow = () => (
    <Show>
        <SimpleShowLayout>
            <NumberField source="id" />
            <TextField source="owner" />
            <TextField source="title" />
            <TextField source="date" />
            <TextField source="text" />
        </SimpleShowLayout>
    </Show>
);