"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@/lib/wallet"
import { Wallet, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function WalletButton() {
  const { address, isConnected, isConnecting, balance, connect, disconnect, switchToSomnia } = useWallet()

  if (!isConnected) {
    return (
      <Button onClick={connect} disabled={isConnecting} className="animate-pulse-glow">
        <Wallet className="mr-2 h-4 w-4" />
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
    )
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
          <Wallet className="h-4 w-4" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">{formatAddress(address!)}</span>
            {balance && <span className="text-xs text-muted-foreground">{balance} STT</span>}
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(address!)}>Copy Address</DropdownMenuItem>
        <DropdownMenuItem onClick={switchToSomnia}>Switch to Somnia</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="https://faucet.somnia.network" target="_blank" rel="noopener noreferrer">
            Get Test Tokens
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnect} className="text-destructive">
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
