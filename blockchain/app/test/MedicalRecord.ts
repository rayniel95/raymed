import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { token } from "../typechain-types/@openzeppelin/contracts";
import { Doctor, MedicalRecord, Patient } from "../typechain-types";

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
        const { doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser } = await loadFixture(deployDoctorFixture);

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
        const { medicalRecord, doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser } = await loadFixture(deployMedicalRecordFixture);

        await medicalRecord.connect(doctorUser).safeMint(patientUser, 'http://test.url');
        return { medicalRecord, doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser };
    }
    describe("Deployment", function () {
        it("Should say owner contract address is doctor contract address", async function () {
            const { medicalRecord, doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser } = await loadFixture(deployMedicalRecordFixture);

            expect(await medicalRecord.nft()).to.equal(await doctor.getAddress());
        });

        it("Should have symbol MRTK", async function () {
            const { medicalRecord, doctor, admin, deployer, superUser, adminUser, doctorUser } = await loadFixture(deployMedicalRecordFixture);

            expect(await medicalRecord.symbol()).to.equal("MRTK");
        });
    });

    describe("Basic opertions", function () {
        describe("Mint related tests", function () {
            it("Should mint a nft", async function () {
                const { medicalRecord, doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser } = await loadFixture(deployMedicalRecordFixture);

                expect(await medicalRecord.connect(doctorUser).safeMint(patientUser, 'http://test.url')).to.not.be.reverted;
                expect(await medicalRecord.balanceOf(patientUser)).to.equal(1);
            });

            it("Should not allow to mint a nft", async function () {
                const { medicalRecord, doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser } = await loadFixture(deployMedicalRecordFixture);

                await expect(
                    (medicalRecord.connect(superUser) as MedicalRecord).safeMint(patientUser, 'https://test.url')
                ).to.be.revertedWithCustomError(
                    medicalRecord,
                    "NftOwnerUnauthorizedAccount"
                ).withArgs(superUser);
            });
        })

        describe("Transfers related test", function () {
            it("Should not to allow transfer the nft", async function () {
                const { medicalRecord, doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser } = await loadFixture(mintFirstMedicalRecord);

                await expect(
                    (medicalRecord.connect(patientUser) as MedicalRecord).transferFrom(patientUser, adminUser, 0)
                ).to.be.revertedWith("Transfers are currently locked");
                await expect(
                    medicalRecord.transferFrom(patientUser, adminUser, 0)
                ).to.be.revertedWith("Transfers are currently locked");
            });
        })

        describe("Burn related test", function () {
            it("Should not to allow burn the nft", async function () {
                const { medicalRecord, doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser } = await loadFixture(mintFirstMedicalRecord);

                await expect(
                    (medicalRecord.connect(patientUser) as MedicalRecord).burn(0)
                ).to.be.revertedWith("burn is loked");
                await expect(
                    (medicalRecord.connect(doctorUser) as MedicalRecord).burn(0)
                ).to.be.revertedWith("burn is loked");
                await expect(
                    (medicalRecord.connect(adminUser) as MedicalRecord).burn(0)
                ).to.be.revertedWith("burn is loked");
                await expect(
                    (medicalRecord.connect(superUser) as MedicalRecord).burn(0)
                ).to.be.revertedWith("burn is loked");
            });
        })
        describe("Update related test", function () {
            it("Should allow to update the nft uri", async function () {
                const { medicalRecord, doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser } = await loadFixture(mintFirstMedicalRecord);

                expect(
                   await (medicalRecord.connect(doctorUser) as MedicalRecord).setTokenURI(0, '/test/medical/record')
                ).to.not.be.reverted;
                expect(
                    await (medicalRecord.connect(patientUser) as MedicalRecord).tokenURI(0)
                 ).to.be.equal('http://medical.record/test/medical/record');
            });
            it("Should not allow to update the nft uri", async function () {
                const { medicalRecord, doctor, admin, deployer, superUser, adminUser, doctorUser, patientUser } = await loadFixture(mintFirstMedicalRecord);

                await expect(
                    (medicalRecord.connect(patientUser) as MedicalRecord).setTokenURI(0, '/test/medical/record')
                ).to.be.revertedWithCustomError(medicalRecord, "NftOwnerUnauthorizedAccount");
                await expect(
                    (medicalRecord.connect(adminUser) as MedicalRecord).setTokenURI(0, '/test/medical/record')
                ).to.be.revertedWithCustomError(medicalRecord, "NftOwnerUnauthorizedAccount");
                await expect(
                    (medicalRecord.connect(superUser) as MedicalRecord).setTokenURI(0, '/test/medical/record')
                ).to.be.revertedWithCustomError(medicalRecord, "NftOwnerUnauthorizedAccount");
            });
        })
    })
});
