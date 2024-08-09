import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import hre from "hardhat";
  import { token } from "../typechain-types/@openzeppelin/contracts";
  import { Doctor, Patient } from "../typechain-types";
  
  describe("Patient", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployAdminFixture() {
      // Contracts are deployed using the first signer/account by default
      const [deployer, superUser, adminUser, doctorUser, patientUser] = await hre.ethers.getSigners();
  
      const AdminFactory = await hre.ethers.getContractFactory("Admin");
      const adminDeployed = await AdminFactory.connect(deployer).deploy(await superUser.getAddress());
      const admin = await adminDeployed.waitForDeployment();
      return { admin, deployer, superUser, adminUser, doctorUser, patientUser };
    }
  
    async function mintFirstAdmin() {
      // Contracts are deployed using the first signer/account by default
      const { admin, deployer, superUser, adminUser, doctorUser, patientUser } = await loadFixture(deployAdminFixture);
  
      await admin.connect(superUser).safeMint(adminUser, 'http://test.url');
      return { admin, deployer, superUser, adminUser, doctorUser, patientUser };
    }
  
    async function deployDoctorFixture() {
      const { admin, deployer, superUser, adminUser, doctorUser, patientUser } = await loadFixture(mintFirstAdmin);
  
      const DoctorFactory = await hre.ethers.getContractFactory("Doctor");
      const doctorDeployed = await DoctorFactory.connect(deployer).deploy(await admin.getAddress());
      const doctor = await doctorDeployed.waitForDeployment();
      return { doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser };
    }
  
    async function mintFirstDoctor() {
        // Contracts are deployed using the first signer/account by default
        const {doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser} = await loadFixture(deployDoctorFixture);
  
        await doctor.connect(adminUser).safeMint(doctorUser, 'http://test.url');
        return { doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser };
    }
  
    async function deployPatientFixture() {
        const { doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser } = await loadFixture(mintFirstDoctor);
    
        const PatientFactory = await hre.ethers.getContractFactory("Patient");
        const patientDeployed = await PatientFactory.connect(deployer).deploy(await doctor.getAddress());
        const patient = await patientDeployed.waitForDeployment();
        return { patient, doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser };
      }
    
      async function mintFirstPatient() {
          // Contracts are deployed using the first signer/account by default
          const {patient, doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser} = await loadFixture(deployPatientFixture);
    
          await patient.connect(doctorUser).safeMint(patientUser, 'http://test.url');
          return { doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser };
      }

    describe("Deployment", function () {
      it("Should say owner contract address is doctor contract address", async function () {
        const { patient, doctor, admin, deployer, superUser, adminUser, doctorUser } = await loadFixture(deployPatientFixture);
  
        expect(await patient.nft()).to.equal(await doctor.getAddress());
      });
  
      it("Should have symbol PTK", async function () {
        const { patient, doctor, admin, deployer, superUser, adminUser, doctorUser } = await loadFixture(deployPatientFixture);
  
        expect(await patient.symbol()).to.equal("PTK");
      });
    });
  
    describe("Basic opertions", function () {
      describe("Burn related test", function() {
        it("Should not to allow burn the nft", async function () {
          const { doctor, admin, deployer, superUser, adminUser, doctorUser  } = await loadFixture(mintFirstDoctor);
          
          await expect(
            (doctor.connect(doctorUser) as Doctor).burn(0)
          ).to.be.revertedWithCustomError(doctor, "NftOwnerUnauthorizedAccount");
    
        });
        it("Should allow burn the nft", async function () {
          const { doctor, admin, deployer, superUser, adminUser, doctorUser  } = await loadFixture(mintFirstDoctor);
          
          expect(
            await (doctor.connect(adminUser) as Doctor).burn(0)
          ).to.not.reverted;
        });
      })
    })
  });
  