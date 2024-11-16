import { Create, SimpleForm, TextInput } from "react-admin";
//TODO - migrate all components to function based ones
export const AdminCreate= () => (
    <Create>
        <SimpleForm>
            <TextInput source="owner" />
            <TextInput source="firstName" />
            <TextInput source="secondName" />
            <TextInput source="firstLastName" />
            <TextInput source="secondLastName" />
            <TextInput source="email" />
            <TextInput source="phone" />
        </SimpleForm>
    </Create>
);