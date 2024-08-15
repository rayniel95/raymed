"use client"; // remove this line if you choose Pages Router
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { AdminList } from "./resources/list/AdminList";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="admins"
      list={AdminList}
      edit={EditGuesser}
      recordRepresentation="name"
    />
    <Resource
      name="doctors"
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="title"
    />
    <Resource name="patients" list={ListGuesser} edit={EditGuesser} />
    <Resource name="medicalRecords" list={ListGuesser} edit={EditGuesser} />
  </Admin>
);

export default AdminApp;
