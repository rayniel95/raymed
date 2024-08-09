import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { token } from "../typechain-types/@openzeppelin/contracts";
import { Patient } from "../typechain-types";

describe("Doctor", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployAdminFixture() {
    // Contracts are deployed using the first signer/account by default
    const [deployer, superUser, adminUser, doctorUser] = await hre.ethers.getSigners();

    const AdminFactory = await hre.ethers.getContractFactory("Admin");
    const adminDeployed = await AdminFactory.connect(deployer).deploy(await superUser.getAddress());
    const admin = await adminDeployed.waitForDeployment();
    return { admin, deployer, superUser, adminUser, doctorUser };
  }

  async function mintFirstAdmin() {
    // Contracts are deployed using the first signer/account by default
    const { admin, deployer, superUser, adminUser, doctorUser } = await loadFixture(deployAdminFixture);

    await admin.connect(superUser).safeMint(adminUser);
    return { admin, deployer, superUser, adminUser, doctorUser };
  }

  async function deployDoctorFixture() {
    const { admin, deployer, superUser, adminUser, doctorUser } = await loadFixture(mintFirstAdmin);

    const DoctorFactory = await hre.ethers.getContractFactory("Doctor");
    const doctorDeployed = await DoctorFactory.connect(deployer).deploy(await admin.getAddress());
    const doctor = await doctorDeployed.waitForDeployment();
    return { doctor, admin, deployer, superUser, adminUser, doctorUser };
  }

  // async function mintFirstDoctor() {
  //     // Contracts are deployed using the first signer/account by default
  //     const { admin, deployer, superUser, adminUser, doctorUser } = await loadFixture(deployDoctorFixture);

  //     await admin.connect(deployer).safeMint(doctorUser);
  //     return { admin, deployer, superUser, adminUser, doctorUser };
  // }

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
        const { doctor, owner, otherAccount } = await loadFixture(deployPatientFixture);

        expect(await doctor.safeMint(otherAccount)).to.not.be.reverted;
        expect(await doctor.balanceOf(otherAccount)).to.equal(1);
      });

      it("Should not allow to mint a nft", async function () {
        const { doctor, owner, otherAccount } = await loadFixture(deployPatientFixture);

        await expect(
          (doctor.connect(otherAccount) as Patient).safeMint(otherAccount)
        ).to.be.revertedWithCustomError(
          doctor,
          "OwnableUnauthorizedAccount"
        ).withArgs(otherAccount);
      });
    })

    describe("Transfers related test", function() {
      it("Should not to allow transfer the nft", async function () {
        const { doctor, owner, otherAccount, tokenId } = await loadFixture(mintFirstNft);
        
        await expect(
          (doctor.connect(otherAccount) as Patient).transferFrom(otherAccount, owner, 1)
        ).to.be.revertedWith("Transfers are currently locked");
        await expect(
          doctor.transferFrom(otherAccount, owner, tokenId)
        ).to.be.revertedWith("Transfers are currently locked");
      });
    })

    describe("Burn related test", function() {
      it("Should not to allow burn the nft", async function () {
        const { doctor, owner, otherAccount, tokenId } = await loadFixture(mintFirstNft);
        
        await expect(
          (doctor.connect(otherAccount) as Patient).burn(1)
        ).to.be.revertedWithCustomError(doctor, "OwnableUnauthorizedAccount");
  
      });
      it("Should allow burn the nft", async function () {
        const { doctor, owner, otherAccount, tokenId } = await loadFixture(mintFirstNft);
        
        expect(
          await doctor.burn(tokenId)
        ).to.not.reverted;
  
      });
    })
  })
});
