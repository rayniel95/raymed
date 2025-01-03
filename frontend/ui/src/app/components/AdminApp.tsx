"use client"; // remove this line if you choose Pages Router

import { Admin, Resource } from "react-admin";
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
import {authProvider} from "../api/auth/authProvider";
import WalletConnectLayout from "./WalletConnectLayout";
import { useAccount, useClient, useWalletClient } from "wagmi";
import { mapper } from "../api/dataprovider/pathToContractMapper";
import { Routes, RoutesHistory } from "../api/routes";
import { useContext } from "react";
import HeliaContext from "../contexts/HeliaContext";
import { NoteEdit } from "./resources/edit/NoteEdit";
import { createDataProvider } from "../api/dataprovider/nftDataProviderHelper";
import { NoteHistoryList } from "./resources/list/NoteHistoryList";
import { NoteHistoryShow } from "./resources/show/NoteHistoryShow";
import { DrugExposureHistoryShow } from "./resources/show/DrugExposureHistoryShow";


//TODO - maybe merge the react admin react query client with wagmi react query client
//TODO - create a wrapper component that check for wallet connection in the sc state 
// modifier components.
const AdminApp = () => {
  const publicClient = useClient();
  const walletClient = useWalletClient();
  const helia = useContext(HeliaContext);
  const {isConnected} = useAccount();

  if (!helia) {
    return <div>Loading...</div>
  }
  
  const dataProvider = createDataProvider(
    publicClient!,
    walletClient!,
    helia!
  )
  const auth = authProvider(walletClient, isConnected);

  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={auth}
      // loginPage={Login} 
      layout={WalletConnectLayout}
    >
      <Resource
        name={Routes.AdminRoute.toString()}
        list={AdminList}
        show={AdminShow}
        create={AdminCreate}
      // recordRepresentation="name"
      />
      <Resource
        name={Routes.DoctorRoute.toString()}
        list={DoctorList}
        show={DoctorShow}
        create={DoctorCreate}
      // recordRepresentation="title"
      />
      <Resource
        name={Routes.PatientRoute.toString()}
        list={PatientList}
        show={PatientShow}
        create={PatientCreate}
      />
      <Resource
        name={Routes.DrugExposureRoute.toString()}
        list={DrugExposureList}
        show={DrugExposureShow}
        create={DrugExposureCreate}
        edit={DrugExposureEdit}
      />
      <Resource
        name={Routes.NoteRoute.toString()}
        list={NoteList}
        show={NoteShow}
        create={NoteCreate}
        edit={NoteEdit}
      />
      <Resource
        name={RoutesHistory.NoteHistoryRoute.toString()}
        list={NoteHistoryList}
        show={NoteHistoryShow}
      />
      <Resource
        name={RoutesHistory.DrugExposureHistoryRoute.toString()}
        list={DrugExposureHistoryShow}
        show={DrugExposureHistoryShow}
      />
    </Admin>
  )
};

export default AdminApp;
