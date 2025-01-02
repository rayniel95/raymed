import { List, Datagrid, TextField, NumberField} from "react-admin";
//TODO - add relations between resources
export const DrugExposureHistoryList = () => (
    <List>
        <Datagrid>
            <NumberField source="id" />
            <TextField source="owner" />
            <TextField source="type" />
            <TextField source="startDate" />
            <TextField source="endDate" />
            <NumberField source="daysSupply" />
            <NumberField source="lotNumber" />
            <TextField source="stopReason" />
        </Datagrid>
    </List>
);