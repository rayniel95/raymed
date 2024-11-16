import { TextField, NumberField, SelectField, Show, SimpleShowLayout } from "react-admin";
//TODO - add relations between resources
export const PatientShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="owner" />
            <TextField source="firstName" />
            <TextField source="secondName" />
            <TextField source="firstLastName" />
            <TextField source="secondLastName" />
            <NumberField source="yearOfBirth" />
            <NumberField source="monthOfBirth" />
            <NumberField source="dayOfBirth" />
            <SelectField source="ethnicity" />
            <SelectField source="gender" />
        </SimpleShowLayout>
    </Show>
);