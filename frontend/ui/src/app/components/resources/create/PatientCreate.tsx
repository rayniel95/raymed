import { Create, SimpleForm, NumberInput, TextInput, SelectInput } from "react-admin";
//TODO - add relations between resources
export const PatientCreate = () => (
    <Create>
        <SimpleForm>
            <NumberInput source="id" />
            <TextInput source="firstName" />
            <TextInput source="secondName" />
            <TextInput source="firstLastName" />
            <TextInput source="secondLastName" />
            <NumberInput source="yearOfBirth" />
            <NumberInput source="monthOfBirth" />
            <NumberInput source="dayOfBirth" />
            <SelectInput source="ethnicity" />
            <SelectInput source="gender" />
        </SimpleForm>
    </Create>
);