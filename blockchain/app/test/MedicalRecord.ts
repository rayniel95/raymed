import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import hre from "hardhat";
  import { token } from "../typechain-types/@openzeppelin/contracts";
  import { Doctor, Patient } from "../typechain-types";
  
  describe("MedicalRecord", function () {
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
    async function deployMedicalRecordFixture() {
        const { doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser } = await loadFixture(mintFirstDoctor);
    
        const MedicalRecordFactory = await hre.ethers.getContractFactory("MedicalRecord");
        const medicalRecordDeployed = await MedicalRecordFactory.connect(deployer).deploy(await doctor.getAddress());
        const medicalRecord = await medicalRecordDeployed.waitForDeployment();
        return { medicalRecord, doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser };
      }
    
      async function mintFirstMedicalRecord() {
          // Contracts are deployed using the first signer/account by default
          const {medicalRecord, doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser} = await loadFixture(deployMedicalRecordFixture);
    
          await medicalRecord.connect(doctorUser).safeMint(patientUser, 'http://test.url');
          return { medicalRecord, doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser };
      }
    describe("Deployment", function () {
      it("Should say owner contract address is admin contract address", async function () {
        const { doctor, admin, deployer, superUser, adminUser, doctorUser } = await loadFixture(deployDoctorFixture);
  
        expect(await doctor.nft()).to.equal(await admin.getAddress());
      });
  
      it("Should have symbol DTK", async function () {
        const { doctor, admin, deployer, superUser, adminUser, doctorUser } = await loadFixture(deployDoctorFixture);
  
        expect(await doctor.symbol()).to.equal("DTK");
      });
    });
  
    describe("Basic opertions", function () {
      describe("Mint related tests", function () {
        it("Should mint a nft", async function () {
          const { doctor, admin, deployer, superUser, adminUser, doctorUser } = await loadFixture(deployDoctorFixture);
  
          expect(await doctor.connect(adminUser).safeMint(doctorUser, 'http://test.url')).to.not.be.reverted;
          expect(await doctor.balanceOf(doctorUser)).to.equal(1);
        });
  
        it("Should not allow to mint a nft", async function () {
          const { doctor, admin, deployer, superUser, adminUser, doctorUser } = await loadFixture(deployDoctorFixture);
  
          await expect(
            (doctor.connect(superUser) as Doctor).safeMint(doctorUser, 'https://test.url')
          ).to.be.revertedWithCustomError(
            doctor,
            "NftOwnerUnauthorizedAccount"
          ).withArgs(superUser);
        });
      })
  
      describe("Transfers related test", function() {
        it("Should not to allow transfer the nft", async function () {
          const { doctor, admin, deployer, superUser, adminUser, doctorUser  } = await loadFixture(mintFirstDoctor);
          
          await expect(
            (doctor.connect(doctorUser) as Doctor).transferFrom(doctorUser, adminUser, 0)
          ).to.be.revertedWith("Transfers are currently locked");
          await expect(
            doctor.transferFrom(doctorUser, adminUser, 0)
          ).to.be.revertedWith("Transfers are currently locked");
        });
      })
  
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
  