import { List, Datagrid, TextField, EmailField, NumberField, SelectField } from "react-admin";

export const DoctorList = () => (
    <List>
        <Datagrid>
            <NumberField source="id" />
            <TextField source="firstName" />
            <TextField source="secondName" />
            <TextField source="firstLastName" />
            <TextField source="secondLastName" />
            <SelectField source="specialty" />
            <EmailField source="email" />
            <TextField source="phone" />
        </Datagrid>
    </List>
);