import { NextRequest, NextResponse } from 'next/server'

// Mock database - in a real app, this would be a proper database
let debates = [
  {
    id: "1",
    title: "ETH's Path to $5K: Technical Analysis vs Market Sentiment",
    marketQuestion: "Will ETH reach $5,000 by Q4 2025?",
    category: "Crypto",
    author: "CryptoAnalyst",
    authorAddress: "0x1234...5678",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    lastActivity: new Date(Date.now() - 12 * 60 * 1000).toISOString(), // 12 minutes ago
    argumentCount: 23,
    upvotes: 45,
    downvotes: 8,
    aiScore: 87,
    stance: "yes",
    preview: "Looking at the technical indicators and upcoming Ethereum upgrades, I believe we're seeing strong fundamentals that support a $5K target...",
    isHot: true,
    participants: 12,
    arguments: [], // Initialize with empty array
  },
  {
    id: "2", 
    title: "AI Token Bubble or Sustainable Growth?",
    marketQuestion: "Will AI tokens outperform BTC in 2025?",
    category: "AI/Tech",
    author: "AIResearcher",
    authorAddress: "0x9876...4321",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    lastActivity: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    argumentCount: 18,
    upvotes: 32,
    downvotes: 15,
    aiScore: 72,
    stance: "no",
    preview: "While AI is revolutionary, the current token valuations seem disconnected from actual utility. Bitcoin's store of value proposition remains stronger...",
    isHot: false,
    participants: 8,
    arguments: [], // Initialize with empty array
  },
]

let argumentsList = [
  {
    id: "1",
    debateId: "1",
    author: "CryptoAnalyst",
    authorAddress: "0x1234...5678",
    content: "Looking at the technical indicators and upcoming Ethereum upgrades, I believe we're seeing strong fundamentals that support a $5K target. The current consolidation phase is healthy and we're building a solid base for the next leg up.",
    stance: "yes",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    upvotes: 23,
    downvotes: 3,
    aiScore: 87,
    aiAnalysis: "Strong technical analysis with clear reasoning. Considers both fundamentals and market psychology.",
    replies: [
      {
        id: "1",
        argumentId: "1",
        author: "MarketBear",
        authorAddress: "0x9876...4321",
        content: "But what about the macroeconomic headwinds? The Fed's stance on rates could significantly impact crypto prices.",
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        upvotes: 8,
        downvotes: 2,
      },
      {
        id: "2",
        argumentId: "1",
        author: "TechBull",
        authorAddress: "0x5555...7777",
        content: "Good point about the technicals. The Dencun upgrade is also going to reduce gas fees significantly, which could drive more adoption.",
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        upvotes: 12,
        downvotes: 1,
      },
    ],
    isHighlighted: true,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sortBy = searchParams.get('sortBy') || 'recent'
    
    let sortedDebates = [...debates]
    
    switch (sortBy) {
      case 'recent':
        sortedDebates.sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
        break
      case 'popular':
        sortedDebates.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
        break
      case 'ai-score':
        sortedDebates.sort((a, b) => b.aiScore - a.aiScore)
        break
    }
    
    return NextResponse.json({ debates: sortedDebates })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch debates' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, marketId, category, stance, initialArgument, author, authorAddress } = body
    
    console.log('Received debate creation request:', body)
    
    if (!title || !description || !marketId || !category || !stance || !initialArgument || !author || !authorAddress) {
      console.log('Missing fields:', { title, description, marketId, category, stance, initialArgument: !!initialArgument, author, authorAddress })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const newDebate = {
      id: (debates.length + 1).toString(),
      title,
      marketQuestion: description,
      category,
      author,
      authorAddress,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      argumentCount: 1,
      upvotes: 0,
      downvotes: 0,
      aiScore: 0,
      stance,
      preview: initialArgument.slice(0, 150) + "...",
      isHot: false,
      participants: 1,
      arguments: [], // Initialize with empty array
    }
    
    debates.unshift(newDebate)
    
    // Create the initial argument
    const newArgument = {
      id: (argumentsList.length + 1).toString(),
      debateId: newDebate.id,
      author,
      authorAddress,
      content: initialArgument,
      stance,
      timestamp: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      aiScore: 0,
      aiAnalysis: "",
      replies: [],
      isHighlighted: false,
    }
    
    argumentsList.push(newArgument)
    
    return NextResponse.json({ debate: newDebate, argument: newArgument }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create debate' },
      { status: 500 }
    )
  }
}
