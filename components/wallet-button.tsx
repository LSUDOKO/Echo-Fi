"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@/lib/wallet"
import { Wallet, ChevronDown, Network, ExternalLink, Copy, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function WalletButton() {
  const {
    address,
    isConnected,
    isConnecting,
    balance,
    isMainnet,
    connect,
    disconnect,
    switchToMainnet,
    switchToTestnet,
  } = useWallet()

  if (!isConnected) {
    return (
      <Button
        onClick={connect}
        disabled={isConnecting}
        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-200"
      >
        <Wallet className="mr-2 h-4 w-4" />
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
    )
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address!)
    // You could add a toast notification here
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-200"
        >
          <Wallet className="h-4 w-4" />
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{formatAddress(address!)}</span>
              <Badge variant={isMainnet ? "default" : "secondary"} className="text-xs">
                {isMainnet ? "Mainnet" : "Testnet"}
              </Badge>
            </div>
            {balance && (
              <span className="text-xs text-muted-foreground">
                {balance} {isMainnet ? "SOMI" : "STT"}
              </span>
            )}
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex items-center space-x-2">
          <Wallet className="h-4 w-4" />
          <span>Wallet Connected</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Network className="h-3 w-3" />
          <span>Network Options</span>
        </DropdownMenuLabel>

        <DropdownMenuItem onClick={switchToMainnet} className="flex items-center justify-between">
          <span>Switch to Mainnet</span>
          <Badge variant={isMainnet ? "default" : "outline"} className="text-xs">
            SOMI
          </Badge>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={switchToTestnet} className="flex items-center justify-between">
          <span>Switch to Testnet</span>
          <Badge variant={!isMainnet ? "default" : "outline"} className="text-xs">
            STT
          </Badge>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={copyAddress} className="flex items-center space-x-2">
          <Copy className="h-4 w-4" />
          <span>Copy Address</span>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={isMainnet ? "https://stakely.io/faucet/somnia-somi" : "https://testnet.somnia.network/"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <ExternalLink className="h-4 w-4" />
            <span>{isMainnet ? "Get SOMI Tokens" : "Get Test Tokens"}</span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={isMainnet ? "https://explorer.somnia.network" : "https://shannon-explorer.somnia.network/"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View on Explorer</span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={disconnect} className="text-destructive flex items-center space-x-2">
          <LogOut className="h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
