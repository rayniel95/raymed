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
            <TextField source="tokenId" label="DrugExposure id" />
        </SimpleShowLayout>
    </Show>
);