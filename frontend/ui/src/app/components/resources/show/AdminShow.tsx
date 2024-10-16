import { TextField, EmailField, NumberField, Show, SimpleShowLayout } from "react-admin";

export const AdminShow = () => (
    <Show>
        <SimpleShowLayout>
            <NumberField source="owner" />
            <TextField source="firstName" />
            <TextField source="secondName" />
            <TextField source="firstLastName" />
            <TextField source="secondLastName" />
            <EmailField source="email" />
            <TextField source="phone" />
        </SimpleShowLayout>
    </Show>
);