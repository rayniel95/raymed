"use client"; // remove this line if you choose Pages Router

import { Admin, Resource, EditGuesser, CustomRoutes } from "react-admin";
import { AdminList } from "./resources/list/AdminList";
import { AdminShow } from "./resources/show/AdminShow";
import { AdminCreate } from "./resources/create/AdminCreate";
import { DoctorList } from "./resources/list/DoctorList";
import { DoctorShow } from "./resources/show/DoctorShow";
import { DoctorCreate } from "./resources/create/DoctorCreate";
import { PatientList } from "./resources/list/PatientList";
import { PatientShow } from "./resources/show/PatientShow";
import { PatientCreate } from "./resources/create/PatientCreate";
import { DrugExposureList } from "./resources/list/DrugExposureList";
import { DrugExposureEdit } from "./resources/edit/DrugExposureEdit";
import { DrugExposureShow } from "./resources/show/DrugExposureShow";
import { DrugExposureCreate } from "./resources/create/DrugExposureCreate";
import { NoteList } from "./resources/list/NoteList";
import { NoteShow } from "./resources/show/NoteShow";
import { NoteCreate } from "./resources/create/NoteCreate";
import dataProvider from "@/test/dataProvider";
import authProvider from "../auth/authProvider";
import { Route } from "react-router-dom";
import Login from "./Login";

//TODO - add traceability to notes and drug exposures. some similar to a historic for
// each item

const AdminApp = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      name="admins"
      list={AdminList}
      show={AdminShow}
      create={AdminCreate}
      recordRepresentation="name"
    />
    <Resource
      name="doctors"
      list={DoctorList}
      show={DoctorShow}
      create={DoctorCreate}
      recordRepresentation="title"
    />
    <Resource
      name="patients"
      list={PatientList}
      show={PatientShow}
      create={PatientCreate}
    />
    <Resource
      name="drugExposures"
      list={DrugExposureList}
      show={DrugExposureShow}
      create={DrugExposureCreate}
      edit={DrugExposureEdit}
    />
    <Resource
      name="notes"
      list={NoteList}
      show={NoteShow}
      create={NoteCreate}
      edit={EditGuesser}
    />
    <CustomRoutes>
      <Route path="/settings" element={<Login />} />
    </CustomRoutes>
  </Admin>
);

export default AdminApp;
