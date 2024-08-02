import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { token } from "../typechain-types/@openzeppelin/contracts";
import { Admin } from "../typechain-types";

describe("Admin", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployAdminFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const AdminFactory = await hre.ethers.getContractFactory("Admin");
    const adminDeployed = await AdminFactory.deploy(await owner.getAddress());
    const admin = await adminDeployed.waitForDeployment();
    return { admin, owner, otherAccount };
  }

  async function mintFirstNft() {
    // Contracts are deployed using the first signer/account by default
    const { admin, owner, otherAccount } = await loadFixture(deployAdminFixture);

    await admin.safeMint(otherAccount)
    return { admin, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should say contract owner is owner address", async function () {
      const { admin, owner } = await loadFixture(deployAdminFixture);

      expect(await admin.owner()).to.equal(owner.address);
    });

    it("Should have symbol ATK", async function () {
      const { admin, owner } = await loadFixture(deployAdminFixture);

      expect(await admin.symbol()).to.equal("ATK");
    });

    // it("Should fail if the unlockTime is not in the future", async function () {
    //   // We don't use the fixture here because we want a different deployment
    //   const latestTime = await time.latest();
    //   const Lock = await hre.ethers.getContractFactory("Lock");
    //   await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
    //     "Unlock time should be in the future"
    //   );
    // });
  });

  describe("Basic opertions", function () {
    describe("Mint related tests", function () {
      it("Should mint a nft", async function () {
        const { admin, owner, otherAccount } = await loadFixture(deployAdminFixture);

        expect(await admin.safeMint(otherAccount)).to.not.be.reverted;
        expect(await admin.balanceOf(otherAccount)).to.equal(1);
      });

      it("Should not allow to mint a nft", async function () {
        const { admin, owner, otherAccount } = await loadFixture(deployAdminFixture);

        await expect(
          (admin.connect(otherAccount) as Admin).safeMint(otherAccount)
        ).to.be.revertedWithCustomError(
          admin,
          "OwnableUnauthorizedAccount"
        ).withArgs(otherAccount);
      });
    })

      const { admin, owner, otherAccount } = await loadFixture(mintFirstNft);

      expect(await admin).to.equal("ATK");
    });
  })
});
