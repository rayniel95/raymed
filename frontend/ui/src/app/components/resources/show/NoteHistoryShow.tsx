import { TextField, NumberField, Show, SimpleShowLayout, ReferenceField } from "react-admin";
//TODO - add relations between resources
export const NoteHistoryShow = () => (
    <Show>
        <SimpleShowLayout>
            <NumberField source="id" />
            <TextField source="owner" />
            <TextField source="title" />
            <TextField source="date" />
            <TextField source="text" />
            <TextField source="tokenId" label="Note id" />
        </SimpleShowLayout>
    </Show>
);