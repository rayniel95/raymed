import { TextField, EmailField, NumberField, SelectField, Show, SimpleShowLayout } from "react-admin";

export const DoctorShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="owner" />
            <TextField source="firstName" />
            <TextField source="secondName" />
            <TextField source="firstLastName" />
            <TextField source="secondLastName" />
            <SelectField source="specialty" />
            <EmailField source="email" />
            <TextField source="phone" />
        </SimpleShowLayout>
    </Show>
);