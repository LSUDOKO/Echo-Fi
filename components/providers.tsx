'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '@/lib/wallet';
import { Toaster } from '@/components/ui/toaster';
import { DebateProvider } from '@/lib/debate-context';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <DebateProvider>
          {children}
          <Toaster />
        </DebateProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
