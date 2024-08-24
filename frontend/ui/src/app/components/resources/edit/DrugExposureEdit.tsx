import { SimpleForm, Edit, TextInput, NumberInput } from "react-admin";
//TODO - add relations between resources
export const DrugExposureEdit = () => (
    <Edit>
        <SimpleForm>
            <NumberInput source="id" InputProps={{ disabled: true }} />
            <TextInput source="patientIdentifier" InputProps={{ disabled: true }} />
            <TextInput source="type" />
            <TextInput source="startDate" />
            <TextInput source="endDate" />
            <NumberInput source="daysSupply" />
            <NumberInput source="lotNumber" />
            <TextInput source="stopReason" multiline rows={5}/>
        </SimpleForm>
    </Edit>
);