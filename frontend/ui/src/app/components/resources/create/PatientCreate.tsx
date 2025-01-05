import { patientEthnicity, patientGender } from "@/app/models/patient/patient";
import { Create, SimpleForm, NumberInput, TextInput, SelectInput } from "react-admin";
//TODO - add relations between resources
export const PatientCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="owner" />
            <TextInput source="firstName" />
            <TextInput source="secondName" />
            <TextInput source="firstLastName" />
            <TextInput source="secondLastName" />
            <NumberInput source="yearOfBirth" />
            <NumberInput source="monthOfBirth" />
            <NumberInput source="dayOfBirth" />
            <SelectInput source="ethnicity" choices={patientEthnicity} />
            <SelectInput source="gender" choices={patientGender} />
        </SimpleForm>
    </Create>
);