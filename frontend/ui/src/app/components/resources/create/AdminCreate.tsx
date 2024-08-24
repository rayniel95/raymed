import { Create, SimpleForm, NumberInput, TextInput } from "react-admin";

export const AdminCreate= () => (
    <Create>
        <SimpleForm>
            <NumberInput source="id" />
            <TextInput source="firstName" />
            <TextInput source="secondName" />
            <TextInput source="firstLastName" />
            <TextInput source="secondLastName" />
            <TextInput source="email" />
            <TextInput source="phone" />
        </SimpleForm>
    </Create>
);