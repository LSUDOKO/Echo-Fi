"use client"

import { useAccount } from "wagmi"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle } from "lucide-react"
import { somniaMainnet, somniaTestnet } from "@/lib/chains"
import { useEffect, useState } from "react"

export function NetworkStatus() {
  const { chain, isConnected } = useAccount()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || !isConnected) {
    return null
  }

  const isOnSomnia = chain?.id === somniaMainnet.id || chain?.id === somniaTestnet.id
  const networkName = chain?.id === somniaMainnet.id ? "Somnia Mainnet" : "Somnia Testnet"

  return (
    <Badge variant={isOnSomnia ? "default" : "destructive"} className="flex items-center space-x-1">
      {isOnSomnia ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
      <span className="text-xs">{isOnSomnia ? networkName : "Wrong Network"}</span>
    </Badge>
  )
}
