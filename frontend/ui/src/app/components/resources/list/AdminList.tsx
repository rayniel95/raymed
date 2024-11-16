'use client'

import { List, Datagrid, TextField, EmailField, NumberField } from "react-admin";
//TODO - use composition for this type of component
export const AdminList = () => (
    <List>
        <Datagrid>
            <NumberField source="id" />
            <TextField source="owner" />
            <TextField source="firstName" />
            <TextField source="secondName" />
            <TextField source="firstLastName" />
            <TextField source="secondLastName" />
            <EmailField source="email" />
            <TextField source="phone" />
        </Datagrid>
    </List>
);