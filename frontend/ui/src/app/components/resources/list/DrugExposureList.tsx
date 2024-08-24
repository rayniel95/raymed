import { List, Datagrid, TextField, NumberField, SelectField } from "react-admin";
//TODO - add relations between resources
export const DrugExposureList = () => (
    <List>
        <Datagrid>
            <NumberField source="id" />
            <TextField source="patientIdentifier" />
            <TextField source="type" />
            <TextField source="startDate" />
            <TextField source="endDate" />
            <NumberField source="daysSupply" />
            <NumberField source="lotNumber" />
            <TextField source="stopReason" />
        </Datagrid>
    </List>
);