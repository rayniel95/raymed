import { List, Datagrid, TextField, EmailField } from "react-admin";

export const AdminList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="firstName" />
            <TextField source="secondName" />
            <TextField source="firstLastName" />
            <TextField source="secondLastName" />
            <EmailField source="email" />
            <TextField source="phone" />
        </Datagrid>
    </List>
);