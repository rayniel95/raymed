import {
    getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
    localhost,
    sepolia
} from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'raymed',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    chains: [sepolia, localhost],
    ssr: false, // If your dApp uses server side rendering (SSR)
});
