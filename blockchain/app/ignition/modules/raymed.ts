import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const RaymedModule = buildModule("Raymed", (m) => {
  const adminOwner = m.getParameter("adminOwner");

  const admin = m.contract("Admin", [adminOwner]);
  const doctor = m.contract("Doctor", [admin]);
  const patient = m.contract("Patient", [doctor]);
  const note = m.contract("Note", [doctor]);
  const drugExposure = m.contract("DrugExposure", [doctor]);

  return { admin, doctor, patient, note, drugExposure };
});

export default RaymedModule;
