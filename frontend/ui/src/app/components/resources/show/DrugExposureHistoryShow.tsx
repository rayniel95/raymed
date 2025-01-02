import { TextField, NumberField, Show, SimpleShowLayout, ReferenceField } from "react-admin";

export const DrugExposureHistoryShow = () => (
    <Show>
        <SimpleShowLayout>
            <NumberField source="id" />
            <TextField source="owner" />
            <TextField source="type" />
            <TextField source="startDate" />
            <TextField source="endDate" />
            <NumberField source="daysSupply" />
            <NumberField source="lotNumber" />
            <TextField source="stopReason" />
            <ReferenceField source="id" label="Patient" reference="patients">
                <SimpleShowLayout>
                    <TextField source="firstName"/>
                    <TextField source="secondName" />
                    <TextField source="firstLastName" />
                    <TextField source="secondLastName" />
                </SimpleShowLayout>
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
);