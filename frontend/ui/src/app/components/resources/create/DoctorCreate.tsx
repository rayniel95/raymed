import { Create, SimpleForm, NumberInput, TextInput, SelectInput } from "react-admin";

export const DoctorCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="owner" />
            <TextInput source="firstName" />
            <TextInput source="secondName" />
            <TextInput source="firstLastName" />
            <TextInput source="secondLastName" />
            <SelectInput source="specialty" />
            <TextInput source="email" />
            <TextInput source="phone" />
        </SimpleForm>
    </Create>
);