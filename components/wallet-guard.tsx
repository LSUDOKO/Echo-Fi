"use client"

import { useWallet } from "@/lib/wallet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, AlertTriangle } from "lucide-react"
import type { ReactNode } from "react"

interface WalletGuardProps {
  children: ReactNode
  requireSomnia?: boolean
}

export function WalletGuard({ children, requireSomnia = true }: WalletGuardProps) {
  const { isConnected, chainId, connect, switchToSomnia } = useWallet()

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Connect your wallet to access EchoFi's prediction markets and debates</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={connect} className="w-full">
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (requireSomnia && chainId !== "0x29A") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle>Wrong Network</CardTitle>
            <CardDescription>Please switch to Somnia Testnet to use EchoFi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={switchToSomnia} className="w-full">
              Switch to Somnia Testnet
            </Button>
            <div className="text-center">
              <a
                href="https://faucet.somnia.network"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Need test tokens? Get them from the faucet
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
