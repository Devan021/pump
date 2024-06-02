"use client";

import React from 'react'
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


import {configureChains,  createconfig, WagmiConfig} from "wagmi";
import {polygonMumbai,sepolia,lineaTestnet1} from "wagmi/chains";
import { publicProvider }  from  "wagmi/providers/public" ;

const projectId = "f968527614b0922bb6d90fa5ecf931ed";


const {chains , publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai , sepolia , lineaTestnet1],
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


const connectors  = connectorsForWallets([
    ...wallets,
    {
        groupName: "Other",
        wallets:   [
            phantomWallet({projectId, chains}),
            argentWallet({projectId , chains}),
            trustWallet({projectId , chains}),
            ledgerWallet({projectId , chains}),
        ],
    },
]);

const wagmiConfig = createconfig({
    autoconnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

const Providers = ({ children }) => {
  return (
    <OriginalWagmiConfig config ={ wagmiConfig }>
        <RainbowKitProvider chains = {chains}  appInfo={demoAppInfo}>
            {children}</RainbowKitProvider>
    </OriginalWagmiConfig>
  );
}

export default Providers
