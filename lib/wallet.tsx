"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Somnia Testnet configuration
export const SOMNIA_TESTNET = {
  chainId: "0x29A", // 666 in hex
  chainName: "Somnia Testnet",
  nativeCurrency: {
    name: "STT",
    symbol: "STT",
    decimals: 18,
  },
  rpcUrls: ["https://testnet-rpc.somnia.network"],
  blockExplorerUrls: ["https://testnet-explorer.somnia.network"],
}

export interface WalletState {
  address: string | null
  isConnected: boolean
  isConnecting: boolean
  chainId: string | null
  balance: string | null
}

export interface WalletContextType extends WalletState {
  connect: () => Promise<void>
  disconnect: () => void
  switchToSomnia: () => Promise<void>
}

const WalletContext = createContext<WalletContextType | null>(null)

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [state, setState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    chainId: null,
    balance: null,
  })

  // Check if wallet is already connected on mount
  useEffect(() => {
    checkConnection()
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect()
        } else {
          setState((prev) => ({
            ...prev,
            address: accounts[0],
            isConnected: true,
          }))
          updateBalance(accounts[0])
        }
      }

      const handleChainChanged = (chainId: string) => {
        setState((prev) => ({ ...prev, chainId }))
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [])

  const checkConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        const chainId = await window.ethereum.request({ method: "eth_chainId" })

        if (accounts.length > 0) {
          setState((prev) => ({
            ...prev,
            address: accounts[0],
            isConnected: true,
            chainId,
          }))
          updateBalance(accounts[0])
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error)
      }
    }
  }

  const updateBalance = async (address: string) => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        })
        // Convert from wei to ETH
        const balanceInEth = (Number.parseInt(balance, 16) / 1e18).toFixed(4)
        setState((prev) => ({ ...prev, balance: balanceInEth }))
      } catch (error) {
        console.error("Error fetching balance:", error)
      }
    }
  }

  const connect = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Please install MetaMask or another Web3 wallet")
      return
    }

    setState((prev) => ({ ...prev, isConnecting: true }))

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      const chainId = await window.ethereum.request({ method: "eth_chainId" })

      setState((prev) => ({
        ...prev,
        address: accounts[0],
        isConnected: true,
        isConnecting: false,
        chainId,
      }))

      updateBalance(accounts[0])

      // Auto-switch to Somnia if not already on it
      if (chainId !== SOMNIA_TESTNET.chainId) {
        await switchToSomnia()
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      setState((prev) => ({ ...prev, isConnecting: false }))
    }
  }

  const disconnect = () => {
    setState({
      address: null,
      isConnected: false,
      isConnecting: false,
      chainId: null,
      balance: null,
    })
  }

  const switchToSomnia = async () => {
    if (typeof window === "undefined" || !window.ethereum) return

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SOMNIA_TESTNET.chainId }],
      })
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [SOMNIA_TESTNET],
          })
        } catch (addError) {
          console.error("Error adding Somnia network:", addError)
        }
      } else {
        console.error("Error switching to Somnia network:", switchError)
      }
    }
  }

  const value: WalletContextType = {
    ...state,
    connect,
    disconnect,
    switchToSomnia,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}
