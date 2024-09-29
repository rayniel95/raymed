/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */

"use client";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  localhost,
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";


const config = getDefaultConfig({
  appName: 'raymed',
  projectId: '245adb7e4c59f87b71e4c4d836af636a',
  chains: [sepolia, localhost],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
