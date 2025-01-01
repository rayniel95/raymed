import { SimpleForm, TextInput, NumberInput, Create } from "react-admin";
//TODO - check/validate components input
//TODO - try to delete the show button that appears once the record is created
// it navigates to the record page but the record is not created yet
export const DrugExposureCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="owner"/>
            <TextInput source="type" />
            <TextInput source="startDate" />
            <TextInput source="endDate" />
            <NumberInput source="daysSupply" />
            <NumberInput source="lotNumber" />
            <TextInput source="stopReason" multiline rows={5}/>
        </SimpleForm>
    </Create>
);