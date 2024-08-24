import { List, Datagrid, TextField, NumberField, SelectField } from "react-admin";
//TODO - add relations between resources
export const NoteList = () => (
    <List>
        <Datagrid>
            <NumberField source="id" />
            <NumberField source="patientIdentifier" />
            <TextField source="title" />
            <TextField source="date" />
            <TextField source="text" />
        </Datagrid>
    </List>
);