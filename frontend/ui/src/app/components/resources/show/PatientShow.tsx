import { patientEthnicity, patientGender } from "@/app/models/patient/patient";
import { TextField, NumberField, SelectField, Show, SimpleShowLayout, ReferenceField, ReferenceManyField, Datagrid } from "react-admin";
//TODO - add relations between resources with a pretty field
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
            <SelectField source="ethnicity" choices={patientEthnicity} />
            <SelectField source="gender" choices={patientGender} />
            <ReferenceManyField source="owner" label="Drug Exposures" target="owner" reference="drugExposures">
                <Datagrid>
                    <TextField source="type" />
                    <TextField source="startDate" />
                    <TextField source="endDate" />
                </Datagrid>
            </ReferenceManyField>
            <ReferenceManyField source="owner" label="Notes" target="owner" reference="notes">
                <Datagrid>
                    <TextField source="title" />
                    <TextField source="date" />
                </Datagrid>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
);