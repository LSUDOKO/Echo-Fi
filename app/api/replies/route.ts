import { NextRequest, NextResponse } from 'next/server'

// Mock replies database - in a real app, this would be shared with arguments route
let repliesList = [
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
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const argumentId = searchParams.get('argumentId')
    
    let filteredReplies = argumentId 
      ? repliesList.filter(reply => reply.argumentId === argumentId)
      : repliesList
    
    return NextResponse.json({ replies: filteredReplies })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch replies' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { argumentId, author, authorAddress, content } = body
    
    if (!argumentId || !author || !authorAddress || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const newReply = {
      id: (repliesList.length + 1).toString(),
      argumentId,
      author,
      authorAddress,
      content,
      timestamp: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
    }
    
    repliesList.push(newReply)
    
    return NextResponse.json({ reply: newReply }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create reply' },
      { status: 500 }
    )
  }
}
