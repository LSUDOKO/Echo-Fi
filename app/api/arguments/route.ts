import { NextRequest, NextResponse } from 'next/server'

// Mock arguments database - in a real app, this would be shared with debates route
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
    const debateId = searchParams.get('debateId')
    const sortBy = searchParams.get('sortBy') || 'recent'
    
    let filteredArguments = debateId 
      ? argumentsList.filter(arg => arg.debateId === debateId)
      : argumentsList
    
    switch (sortBy) {
      case 'recent':
        filteredArguments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        break
      case 'popular':
        filteredArguments.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
        break
      case 'ai-score':
        filteredArguments.sort((a, b) => b.aiScore - a.aiScore)
        break
    }
    
    return NextResponse.json({ arguments: filteredArguments })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch arguments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { debateId, author, authorAddress, content, stance } = body
    
    if (!debateId || !author || !authorAddress || !content || !stance) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const newArgument = {
      id: (argumentsList.length + 1).toString(),
      debateId,
      author,
      authorAddress,
      content,
      stance,
      timestamp: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      aiScore: Math.floor(Math.random() * 40) + 60, // Mock AI score between 60-100
      aiAnalysis: "This argument shows good reasoning and provides relevant evidence to support the position.",
      replies: [],
      isHighlighted: false,
    }
    
    argumentsList.push(newArgument)
    
    return NextResponse.json({ argument: newArgument }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create argument' },
      { status: 500 }
    )
  }
}
