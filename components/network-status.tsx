"use client"

import { useWallet } from "@/lib/wallet"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle } from "lucide-react"

export function NetworkStatus() {
  const { chainId, isConnected } = useWallet()

  if (!isConnected) return null

  const isOnSomnia = chainId === "0x29A" // Somnia Testnet chain ID

  return (
    <Badge variant={isOnSomnia ? "default" : "destructive"} className="flex items-center space-x-1">
      {isOnSomnia ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
      <span className="text-xs">{isOnSomnia ? "Somnia Testnet" : "Wrong Network"}</span>
    </Badge>
  )
}
