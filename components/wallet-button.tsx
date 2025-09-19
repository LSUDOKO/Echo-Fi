"use client"

import { useAccount, useConnect, useDisconnect, useSwitchChain, useBalance } from 'wagmi';
import { somniaMainnet, somniaTestnet } from '@/lib/chains';
import { Button } from "@/components/ui/button"
import { Wallet, ChevronDown, Network, ExternalLink, Copy, LogOut, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { injected } from 'wagmi/connectors';
import { useToast } from '@/components/ui/use-toast';

export function WalletButton() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });
  const { connect, connectors, isPending: isConnecting, error: connectError } = useConnect();
  const { disconnect, isPending: isDisconnecting } = useDisconnect();
  const { switchChain, isPending: isSwitchingChain } = useSwitchChain();
  const { toast } = useToast();

  const isMainnet = chain?.id === somniaMainnet.id;

  const handleConnect = async (connector?: any) => {
    try {
      const selectedConnector = connector || injected();
      await connect({ connector: selectedConnector });
      const connectorName = selectedConnector.name || 'Wallet';
      toast({ title: "Wallet Connected", description: `${connectorName} has been successfully connected`, variant: "success" });
    } catch (error) {
      console.error("Connection error:", error);
      let errorMessage = "Failed to connect wallet";
      
      if (error instanceof Error) {
        if (error.message.includes("rejected")) {
          errorMessage = "Connection rejected by user";
        } else if (error.message.includes("not found")) {
          errorMessage = "No wallet found. Please install MetaMask or another wallet";
        } else if (error.message.includes("disconnected")) {
          errorMessage = "Wallet is disconnected. Please unlock your wallet";
        } else if (error.message.includes("already pending")) {
          errorMessage = "Connection already in progress. Please wait.";
        }
      }
      
      toast({ title: "Connection Failed", description: errorMessage, variant: "destructive" });
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast({ title: "Wallet Disconnected", description: "Your wallet has been disconnected", variant: "success" });
    } catch (error) {
      console.error("Disconnect error:", error);
      toast({ title: "Disconnect Failed", description: "Failed to disconnect wallet", variant: "destructive" });
    }
  };

  const handleSwitchChain = async (chainId: number) => {
    try {
      await switchChain({ chainId });
      const chainName = chainId === somniaMainnet.id ? "Mainnet" : "Testnet";
      toast({ title: "Network Switched", description: `Successfully switched to ${chainName}`, variant: "success" });
    } catch (error) {
      console.error("Switch chain error:", error);
      let errorMessage = "Failed to switch network";
      
      if (error instanceof Error) {
        if (error.message.includes("rejected")) {
          errorMessage = "Network switch rejected by user";
        } else if (error.message.includes("unrecognized")) {
          errorMessage = "Network not recognized by wallet. Please add it manually";
        }
      }
      
      toast({ title: "Switch Failed", description: errorMessage, variant: "destructive" });
    }
  };

  if (!isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={isConnecting}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-200"
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Select Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {connectors.map((connector) => (
            <DropdownMenuItem
              key={connector.uid}
              onClick={() => handleConnect(connector)}
              disabled={isConnecting || !connector.ready}
              className="flex items-center space-x-2"
            >
              <Wallet className="h-4 w-4" />
              <span>{connector.name}</span>
              {!connector.ready && (
                <Badge variant="outline" className="text-xs ml-auto">
                  Not Installed
                </Badge>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const copyAddress = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address)
        toast({ title: "Address Copied", description: "Wallet address copied to clipboard", variant: "success" });
      } catch (error) {
        console.error("Copy error:", error);
        toast({ title: "Copy Failed", description: "Failed to copy address to clipboard", variant: "destructive" });
      }
    }
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
              {address && <span className="text-sm font-medium">{formatAddress(address)}</span>}
              <Badge variant={isMainnet ? "default" : "secondary"} className="text-xs">
                {isMainnet ? "Mainnet" : "Testnet"}
              </Badge>
            </div>
            {balance && (
              <span className="text-xs text-muted-foreground">
                {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
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

        <DropdownMenuItem 
          onClick={() => handleSwitchChain(somniaMainnet.id)} 
          disabled={isSwitchingChain || chain?.id === somniaMainnet.id} 
          className="flex items-center justify-between"
        >
          <span className="flex items-center">
            {isSwitchingChain && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Switch to Mainnet
          </span>
          <Badge variant={isMainnet ? "default" : "outline"} className="text-xs">
            SOMI
          </Badge>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleSwitchChain(somniaTestnet.id)} 
          disabled={isSwitchingChain || chain?.id === somniaTestnet.id} 
          className="flex items-center justify-between"
        >
          <span className="flex items-center">
            {isSwitchingChain && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Switch to Testnet
          </span>
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
            href={chain?.blockExplorers?.default.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View on Explorer</span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          onClick={handleDisconnect} 
          disabled={isDisconnecting} 
          className="text-destructive flex items-center space-x-2"
        >
          {isDisconnecting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Disconnecting...</span>
            </>
          ) : (
            <>
              <LogOut className="h-4 w-4" />
              <span>Disconnect</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
