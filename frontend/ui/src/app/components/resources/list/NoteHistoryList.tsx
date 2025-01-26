import { List, Datagrid, TextField, NumberField} from "react-admin";

export const NoteHistoryList = () => (
    <List>
        <Datagrid>
            <NumberField source="id" />
            <TextField source="owner" />
            <TextField source="title" />
            <TextField source="date" />
            <TextField source="text" />
            <NumberField source="tokenId" label="Note id"/>
        </Datagrid>
    </List>
);