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
                arguments: [...(debate.arguments || []), action.payload.argument],
                argumentCount: (debate.argumentCount || 0) + 1,
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
          arguments: (debate.arguments || []).map(argument =>
            argument.id === action.payload.argumentId
              ? {
                  ...argument,
                  replies: [...(argument.replies || []), action.payload.reply],
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
          arguments: (debate.arguments || []).map(argument => {
            if (action.payload.type === 'argument' && argument.id === action.payload.id) {
              return {
                ...argument,
                upvotes: action.payload.voteType === 'up' ? argument.upvotes + 1 : argument.upvotes,
                downvotes: action.payload.voteType === 'down' ? argument.downvotes + 1 : argument.downvotes,
              }
            }
            return {
              ...argument,
              replies: (argument.replies || []).map(reply =>
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

  // API functions
  const fetchDebatesFromAPI = async () => {
    try {
      const response = await fetch('/api/debates?sortBy=recent')
      if (!response.ok) {
        throw new Error('Failed to fetch debates')
      }
      const data = await response.json()
      return data.debates
    } catch (error) {
      console.error('Error fetching debates:', error)
      throw error
    }
  }

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

  const fetchArgumentsFromAPI = async (debateId?: string) => {
    try {
      const url = debateId ? `/api/arguments?debateId=${debateId}` : '/api/arguments'
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch arguments')
      }
      const data = await response.json()
      return data.arguments
    } catch (error) {
      console.error('Error fetching arguments:', error)
      throw error
    }
  }

  const createDebateInAPI = async (debateData: any) => {
    try {
      const response = await fetch('/api/debates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(debateData),
      })
      if (!response.ok) {
        throw new Error('Failed to create debate')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error creating debate:', error)
      throw error
    }
  }

  const addArgumentInAPI = async (argumentData: any) => {
    try {
      const response = await fetch('/api/arguments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(argumentData),
      })
      if (!response.ok) {
        throw new Error('Failed to create argument')
      }
      const data = await response.json()
      return data.argument
    } catch (error) {
      console.error('Error creating argument:', error)
      throw error
    }
  }

  const addReplyInAPI = async (replyData: any) => {
    try {
      const response = await fetch('/api/replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(replyData),
      })
      if (!response.ok) {
        throw new Error('Failed to create reply')
      }
      const data = await response.json()
      return data.reply
    } catch (error) {
      console.error('Error creating reply:', error)
      throw error
    }
  }

  const voteInAPI = async (voteData: any) => {
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voteData),
      })
      if (!response.ok) {
        throw new Error('Failed to record vote')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error recording vote:', error)
      throw error
    }
  }

  const actions = {
    createDebate: async (debateData: Omit<Debate, 'id' | 'createdAt' | 'lastActivity' | 'arguments'>) => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const result = await createDebateInAPI(debateData)
        dispatch({ type: 'ADD_DEBATE', payload: result.debate })
        // Also add the initial argument to the state
        if (result.argument) {
          dispatch({ type: 'ADD_ARGUMENT', payload: { debateId: result.debate.id, argument: result.argument } })
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to create debate' })
        throw error
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },

    addArgument: async (debateId: string, argumentData: Omit<Argument, 'id' | 'timestamp'>) => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const newArgument = await addArgumentInAPI({ ...argumentData, debateId })
        dispatch({ type: 'ADD_ARGUMENT', payload: { debateId, argument: newArgument } })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to add argument' })
        throw error
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },

    addReply: async (argumentId: string, replyData: Omit<Reply, 'id' | 'timestamp'>) => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const newReply = await addReplyInAPI({ ...replyData, argumentId })
        dispatch({ type: 'ADD_REPLY', payload: { argumentId, reply: newReply } })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to add reply' })
        throw error
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },

    vote: async (type: 'argument' | 'reply', id: string, voteType: 'up' | 'down') => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        if (!address) {
          throw new Error('Wallet not connected')
        }
        
        await voteInAPI({ type, id, voteType, userId: address })
        dispatch({ type: 'UPDATE_VOTE', payload: { type, id, voteType } })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to vote' })
        throw error
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },

    fetchDebates: async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const debates = await fetchDebatesFromAPI()
        dispatch({ type: 'SET_DEBATES', payload: debates })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch debates' })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },

    fetchMarkets: async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        // For now, we'll use mock markets since we don't have a markets API yet
        await new Promise(resolve => setTimeout(resolve, 500))
        dispatch({ type: 'SET_MARKETS', payload: mockMarkets })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch markets' })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
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
