import { defineChain } from 'viem';

export const somniaMainnet = defineChain({
  id: 5031,
  name: 'Somnia Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'SOMI',
    symbol: 'SOMI',
  },
  rpcUrls: {
    default: { http: ['https://api.infra.mainnet.somnia.network/'] },
    public: { http: ['https://somnia.publicnode.com'] },
  },
  blockExplorers: {
    default: { name: 'SomniaScan', url: 'https://explorer.somnia.network' },
  },
  testnet: false,
});

export const somniaTestnet = defineChain({
  id: 50312,
  name: 'Somnia Shannon Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'STT',
    symbol: 'STT',
  },
  rpcUrls: {
    default: { http: ['https://dream-rpc.somnia.network/'] },
    public: { http: ['https://dream-rpc.somnia.network/'] },
  },
  blockExplorers: {
    default: { name: 'Shannon Explorer', url: 'https://shannon-explorer.somnia.network' },
  },
  testnet: true,
});
