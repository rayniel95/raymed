import {
    getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
    localhost,
    sepolia,
} from 'wagmi/chains';
import { http } from 'wagmi';

export const config = getDefaultConfig({
    appName: 'raymed',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    chains: [sepolia, localhost],
    ssr: false, // If your dApp uses server side rendering (SSR)
    transports:{
        [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_APY_KEY}`),
    }
});
