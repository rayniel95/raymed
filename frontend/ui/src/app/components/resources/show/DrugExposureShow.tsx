import { TextField, NumberField, SelectField, Show, SimpleShowLayout } from "react-admin";
//TODO - add relations between resources
export const DrugExposureShow = () => (
    <Show>
        <SimpleShowLayout>
            <NumberField source="id" />
            <TextField source="patientIdentifier" />
            <TextField source="type" />
            <TextField source="startDate" />
            <TextField source="endDate" />
            <NumberField source="daysSupply" />
            <NumberField source="lotNumber" />
            <TextField source="stopReason" />
        </SimpleShowLayout>
    </Show>
);