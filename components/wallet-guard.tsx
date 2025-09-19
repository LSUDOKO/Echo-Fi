"use client"

import { useAccount, useConnect, useSwitchChain } from "wagmi"
import { somniaMainnet, somniaTestnet } from "@/lib/chains"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, AlertTriangle, Loader2 } from "lucide-react"
import type { ReactNode } from "react"
import { injected } from 'wagmi/connectors'
import { useToast } from '@/components/ui/use-toast';

interface WalletGuardProps {
  children: ReactNode
  requireSomnia?: boolean
}

export function WalletGuard({ children, requireSomnia = true }: WalletGuardProps) {
  const { isConnected, chain } = useAccount()
  const { connect, isPending: isConnecting } = useConnect()
  const { switchChain, isPending: isSwitchingChain } = useSwitchChain()
  const { toast } = useToast()

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
            <Button 
              onClick={async () => {
                try {
                  await connect({ connector: injected() })
                  toast({ title: "Wallet Connected", description: "Your wallet has been successfully connected", variant: "success" })
                } catch (error) {
                  console.error("Connection error:", error)
                  let errorMessage = "Failed to connect wallet"
                  
                  if (error instanceof Error) {
                    if (error.message.includes("rejected")) {
                      errorMessage = "Connection rejected by user"
                    } else if (error.message.includes("not found")) {
                      errorMessage = "No wallet found. Please install MetaMask or another wallet"
                    } else if (error.message.includes("disconnected")) {
                      errorMessage = "Wallet is disconnected. Please unlock your wallet"
                    }
                  }
                  
                  toast({ title: "Connection Failed", description: errorMessage, variant: "destructive" })
                }
              }} 
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect Wallet"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isOnSomnia = chain?.id === somniaMainnet.id || chain?.id === somniaTestnet.id

  if (requireSomnia && !isOnSomnia) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle>Wrong Network</CardTitle>
            <CardDescription>Please switch to a Somnia network to use EchoFi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={async () => {
                try {
                  await switchChain({ chainId: somniaTestnet.id })
                  toast({ title: "Network Switched", description: "Successfully switched to Testnet", variant: "success" })
                } catch (error) {
                  console.error("Switch chain error:", error)
                  let errorMessage = "Failed to switch network"
                  
                  if (error instanceof Error) {
                    if (error.message.includes("rejected")) {
                      errorMessage = "Network switch rejected by user"
                    } else if (error.message.includes("unrecognized")) {
                      errorMessage = "Network not recognized by wallet. Please add it manually"
                    }
                  }
                  
                  toast({ title: "Switch Failed", description: errorMessage, variant: "destructive" })
                }
              }}
              disabled={isSwitchingChain}
              className="w-full"
            >
              {isSwitchingChain ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Switching...
                </>
              ) : (
                "Switch to Somnia Testnet"
              )}
            </Button>
            <Button 
              onClick={async () => {
                try {
                  await switchChain({ chainId: somniaMainnet.id })
                  toast({ title: "Network Switched", description: "Successfully switched to Mainnet", variant: "success" })
                } catch (error) {
                  console.error("Switch chain error:", error)
                  let errorMessage = "Failed to switch network"
                  
                  if (error instanceof Error) {
                    if (error.message.includes("rejected")) {
                      errorMessage = "Network switch rejected by user"
                    } else if (error.message.includes("unrecognized")) {
                      errorMessage = "Network not recognized by wallet. Please add it manually"
                    }
                  }
                  
                  toast({ title: "Switch Failed", description: errorMessage, variant: "destructive" })
                }
              }}
              disabled={isSwitchingChain}
              className="w-full" 
              variant="secondary"
            >
              {isSwitchingChain ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Switching...
                </>
              ) : (
                "Switch to Somnia Mainnet"
              )}
            </Button>
            <div className="text-center">
              <a
                href="https://testnet.somnia.network/"
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
