import {
    getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
    localhost,
    sepolia
} from 'wagmi/chains';


export const config = getDefaultConfig({
    appName: 'raymed',
    projectId: '245adb7e4c59f87b71e4c4d836af636a',
    chains: [sepolia, localhost],
    ssr: false, // If your dApp uses server side rendering (SSR)
});

