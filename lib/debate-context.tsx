"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { useAccount } from 'wagmi'

// Types
export interface Market {
  id: string
  question: string
  category: string
  outcomes: string[]
  volume: number
  liquidity: number
  resolved: boolean
  resolution?: string
}

export interface Argument {
  id: string
  debateId: string
  author: string
  authorAddress: string
  content: string
  stance: "yes" | "no"
  timestamp: string
  upvotes: number
  downvotes: number
  aiScore: number
  aiAnalysis: string
  replies: Reply[]
  isHighlighted: boolean
}

export interface Reply {
  id: string
  argumentId: string
  author: string
  authorAddress: string
  content: string
  timestamp: string
  upvotes: number
  downvotes: number
}

export interface Debate {
  id: string
  title: string
  description: string
  marketId: string
  marketQuestion: string
  category: string
  author: string
  authorAddress: string
  createdAt: string
  lastActivity: string
  argumentCount: number
  upvotes: number
  downvotes: number
  aiScore: number
  stance: "yes" | "no"
  preview: string
  isHot: boolean
  participants: number
  arguments: Argument[]
}

interface DebateState {
  debates: Debate[]
  markets: Market[]
  loading: boolean
  error: string | null
}

type DebateAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_DEBATES'; payload: Debate[] }
  | { type: 'SET_MARKETS'; payload: Market[] }
  | { type: 'ADD_DEBATE'; payload: Debate }
  | { type: 'ADD_ARGUMENT'; payload: { debateId: string; argument: Argument } }
  | { type: 'ADD_REPLY'; payload: { argumentId: string; reply: Reply } }
  | { type: 'UPDATE_VOTE'; payload: { type: 'argument' | 'reply'; id: string; voteType: 'up' | 'down' } }
  | { type: 'UPDATE_DEBATE_ACTIVITY'; payload: { debateId: string; timestamp: string } }

const initialState: DebateState = {
  debates: [],
  markets: [],
  loading: false,
  error: null,
}

function debateReducer(state: DebateState, action: DebateAction): DebateState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    
    case 'SET_DEBATES':
      return { ...state, debates: action.payload, loading: false }
    
    case 'SET_MARKETS':
      return { ...state, markets: action.payload }
    
    case 'ADD_DEBATE':
      return { ...state, debates: [action.payload, ...state.debates] }
    
    case 'ADD_ARGUMENT':
      return {
        ...state,
        debates: state.debates.map(debate =>
          debate.id === action.payload.debateId
            ? {
                ...debate,
                arguments: [...debate.arguments, action.payload.argument],
                argumentCount: debate.argumentCount + 1,
                lastActivity: new Date().toISOString(),
              }
            : debate
        ),
      }
    
    case 'ADD_REPLY':
      return {
        ...state,
        debates: state.debates.map(debate => ({
          ...debate,
          arguments: debate.arguments.map(argument =>
            argument.id === action.payload.argumentId
              ? {
                  ...argument,
                  replies: [...argument.replies, action.payload.reply],
                }
              : argument
          ),
          lastActivity: new Date().toISOString(),
        })),
      }
    
    case 'UPDATE_VOTE':
      return {
        ...state,
        debates: state.debates.map(debate => ({
          ...debate,
          arguments: debate.arguments.map(argument => {
            if (action.payload.type === 'argument' && argument.id === action.payload.id) {
              return {
                ...argument,
                upvotes: action.payload.voteType === 'up' ? argument.upvotes + 1 : argument.upvotes,
                downvotes: action.payload.voteType === 'down' ? argument.downvotes + 1 : argument.downvotes,
              }
            }
            return {
              ...argument,
              replies: argument.replies.map(reply =>
                action.payload.type === 'reply' && reply.id === action.payload.id
                  ? {
                      ...reply,
                      upvotes: action.payload.voteType === 'up' ? reply.upvotes + 1 : reply.upvotes,
                      downvotes: action.payload.voteType === 'down' ? reply.downvotes + 1 : reply.downvotes,
                    }
                  : reply
              ),
            }
          }),
        })),
      }
    
    case 'UPDATE_DEBATE_ACTIVITY':
      return {
        ...state,
        debates: state.debates.map(debate =>
          debate.id === action.payload.debateId
            ? { ...debate, lastActivity: action.payload.timestamp }
            : debate
        ),
      }
    
    default:
      return state
  }
}

const DebateContext = createContext<{
  state: DebateState
  dispatch: React.Dispatch<DebateAction>
  actions: {
    createDebate: (debate: Omit<Debate, 'id' | 'createdAt' | 'lastActivity' | 'arguments'>) => Promise<void>
    addArgument: (debateId: string, argument: Omit<Argument, 'id' | 'timestamp'>) => Promise<void>
    addReply: (argumentId: string, reply: Omit<Reply, 'id' | 'timestamp'>) => Promise<void>
    vote: (type: 'argument' | 'reply', id: string, voteType: 'up' | 'down') => Promise<void>
    fetchDebates: () => Promise<void>
    fetchMarkets: () => Promise<void>
  }
} | null>(null)

export function DebateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(debateReducer, initialState)
  const { address } = useAccount()

  // Mock data for development
  const mockMarkets: Market[] = [
    {
      id: "1",
      question: "Will ETH reach $5,000 by Q4 2025?",
      category: "Crypto",
      outcomes: ["Yes", "No"],
      volume: 1500000,
      liquidity: 500000,
      resolved: false,
    },
    {
      id: "2",
      question: "Will AI tokens outperform BTC in 2025?",
      category: "AI/Tech",
      outcomes: ["Yes", "No"],
      volume: 800000,
      liquidity: 300000,
      resolved: false,
    },
    {
      id: "3",
      question: "Will Somnia TVL exceed $1B by end of 2025?",
      category: "DeFi",
      outcomes: ["Yes", "No"],
      volume: 1200000,
      liquidity: 400000,
      resolved: false,
    },
  ]

  const mockDebates: Debate[] = [
    {
      id: "1",
      title: "ETH's Path to $5K: Technical Analysis vs Market Sentiment",
      description: "A comprehensive analysis of Ethereum's potential to reach $5,000 by Q4 2025",
      marketId: "1",
      marketQuestion: "Will ETH reach $5,000 by Q4 2025?",
      category: "Crypto",
      author: "CryptoAnalyst",
      authorAddress: "0x1234...5678",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      lastActivity: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      argumentCount: 23,
      upvotes: 45,
      downvotes: 8,
      aiScore: 87,
      stance: "yes",
      preview: "Looking at the technical indicators and upcoming Ethereum upgrades, I believe we're seeing strong fundamentals that support a $5K target...",
      isHot: true,
      participants: 12,
      arguments: [],
    },
    {
      id: "2",
      title: "AI Token Bubble or Sustainable Growth?",
      description: "Analysis of AI token valuations and their potential to outperform Bitcoin",
      marketId: "2",
      marketQuestion: "Will AI tokens outperform BTC in 2025?",
      category: "AI/Tech",
      author: "AIResearcher",
      authorAddress: "0x9876...4321",
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      argumentCount: 18,
      upvotes: 32,
      downvotes: 15,
      aiScore: 72,
      stance: "no",
      preview: "While AI is revolutionary, the current token valuations seem disconnected from actual utility...",
      isHot: false,
      participants: 8,
      arguments: [],
    },
  ]

  const actions = {
    createDebate: async (debateData: Omit<Debate, 'id' | 'createdAt' | 'lastActivity' | 'arguments'>) => {
      if (!address) {
        dispatch({ type: 'SET_ERROR', payload: 'Wallet not connected' })
        return
      }

      try {
        const newDebate: Debate = {
          ...debateData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          lastActivity: new Date().toISOString(),
          arguments: [],
        }
        
        dispatch({ type: 'ADD_DEBATE', payload: newDebate })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to create debate' })
      }
    },

    addArgument: async (debateId: string, argumentData: Omit<Argument, 'id' | 'timestamp'>) => {
      if (!address) {
        dispatch({ type: 'SET_ERROR', payload: 'Wallet not connected' })
        return
      }

      try {
        const newArgument: Argument = {
          ...argumentData,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
        }
        
        dispatch({ type: 'ADD_ARGUMENT', payload: { debateId, argument: newArgument } })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to add argument' })
      }
    },

    addReply: async (argumentId: string, replyData: Omit<Reply, 'id' | 'timestamp'>) => {
      if (!address) {
        dispatch({ type: 'SET_ERROR', payload: 'Wallet not connected' })
        return
      }

      try {
        const newReply: Reply = {
          ...replyData,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
        }
        
        dispatch({ type: 'ADD_REPLY', payload: { argumentId, reply: newReply } })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to add reply' })
      }
    },

    vote: async (type: 'argument' | 'reply', id: string, voteType: 'up' | 'down') => {
      if (!address) {
        dispatch({ type: 'SET_ERROR', payload: 'Wallet not connected' })
        return
      }

      try {
        dispatch({ type: 'UPDATE_VOTE', payload: { type, id, voteType } })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to vote' })
      }
    },

    fetchDebates: async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        dispatch({ type: 'SET_DEBATES', payload: mockDebates })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch debates' })
      }
    },

    fetchMarkets: async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        dispatch({ type: 'SET_MARKETS', payload: mockMarkets })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch markets' })
      }
    },
  }

  // Initialize data
  useEffect(() => {
    actions.fetchMarkets()
    actions.fetchDebates()
  }, [])

  return (
    <DebateContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </DebateContext.Provider>
  )
}

export function useDebates() {
  const context = useContext(DebateContext)
  if (!context) {
    throw new Error('useDebates must be used within a DebateProvider')
  }
  return context
}
