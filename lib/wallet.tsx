import { http, createConfig } from 'wagmi';
import { somniaMainnet, somniaTestnet } from './chains';
import { injected, coinbaseWallet, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [somniaMainnet, somniaTestnet],
  connectors: [
    injected({
      target: 'metaMask',
      shimDisconnect: true,
    }),
    coinbaseWallet({
      appName: 'EchoFi',
      appLogoUrl: 'https://echofi.com/logo.png', // Replace with your actual logo URL
    }),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo', // Replace with your actual project ID
      metadata: {
        name: 'EchoFi',
        description: 'Decentralized prediction markets and debates platform',
        url: 'https://echofi.com', // Replace with your actual URL
        icons: ['https://echofi.com/logo.png'], // Replace with your actual logo URL
      },
    }),
  ],
  transports: {
    [somniaMainnet.id]: http(
      process.env.NEXT_PUBLIC_SOMNIA_MAINNET_RPC || 'https://api.infra.mainnet.somnia.network/'
    ),
    [somniaTestnet.id]: http(
      process.env.NEXT_PUBLIC_SOMNIA_TESTNET_RPC || 'https://dream-rpc.somnia.network/'
    ),
  },
  ssr: true,
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
});