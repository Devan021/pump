"use client";

import React from 'react';
import {
    RainbowKitProvider,
    getDefaultWallets,
    connectorsForWallets
} from "@rainbow-me/rainbowkit";

import {
    phantomWallet,
    argentWallet,
    trustWallet,
    ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { configureChains, createConfig, WagmiProvider } from "wagmi";
import { polygonMumbai, sepolia, lineaTestnet1 } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const projectId = "process.env.PROJECT_ID";

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai, sepolia, lineaTestnet1],
    [publicProvider()]
);

const { wallets } = getDefaultWallets({
    appName: "Zreeled",
    projectId,
    chains,
});

const demoAppInfo = {
    appName: "Zreeled"
};



const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: "Other",
        wallets: [
            phantomWallet({ projectId, chains }),
            argentWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
        ],
    },
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

const Providers = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider 
        chains={chains}
        appInfo={demoAppInfo}>
        modalSize="compact"
            {children}
        </RainbowKitProvider>
    </WagmiProvider>
  );
};

export default Providers;
