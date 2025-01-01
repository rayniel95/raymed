import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers";
import { vars } from "hardhat/config";

// const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");
// const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");


const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost:{
      chainId: 1337,
    },
    // sepolia: {
    //   url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    //   accounts: [SEPOLIA_PRIVATE_KEY]
    // }
  }
};

export default config;
