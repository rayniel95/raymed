import { SimpleForm, TextInput, NumberInput, Create } from "react-admin";
//TODO - add relations between resources
//TODO - check/validate components input
export const DrugExposureCreate = () => (
    <Create>
        <SimpleForm>
            {/* <NumberInput source="id" InputProps={{ disabled: true }} /> */}
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