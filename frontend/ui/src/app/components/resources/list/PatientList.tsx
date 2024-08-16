import { List, Datagrid, TextField, NumberField, SelectField } from "react-admin";

export const PatientList = () => (
    <List>
        <Datagrid>
            <NumberField source="id" />
            <TextField source="firstName" />
            <TextField source="secondName" />
            <TextField source="firstLastName" />
            <TextField source="secondLastName" />
            <NumberField source="yearOfBirth" />
            <NumberField source="monthOfBirth" />
            <NumberField source="dayOfBirth" />
            <SelectField source="ethnicity" />
            <SelectField source="gender" />
        </Datagrid>
    </List>
);