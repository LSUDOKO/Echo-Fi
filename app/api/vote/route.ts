import { NextRequest, NextResponse } from 'next/server'

// Mock voting database - in a real app, this would track user votes to prevent double voting
const userVotes = new Map<string, Set<string>>() // userId -> Set of voted item IDs

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, id, voteType, userId } = body
    
    if (!type || !id || !voteType || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    if (!['argument', 'reply'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be "argument" or "reply"' },
        { status: 400 }
      )
    }
    
    if (!['up', 'down'].includes(voteType)) {
      return NextResponse.json(
        { error: 'Invalid vote type. Must be "up" or "down"' },
        { status: 400 }
      )
    }
    
    // Check if user has already voted on this item
    const userVoteKey = `${type}:${id}`
    if (!userVotes.has(userId)) {
      userVotes.set(userId, new Set())
    }
    
    const userVotedItems = userVotes.get(userId)!
    
    if (userVotedItems.has(userVoteKey)) {
      return NextResponse.json(
        { error: 'User has already voted on this item' },
        { status: 400 }
      )
    }
    
    // Record the vote
    userVotedItems.add(userVoteKey)
    
    // In a real app, this would update the database
    // For now, we'll just return success
    return NextResponse.json({ 
      message: `Vote ${voteType === 'up' ? 'upvoted' : 'downvoted'} successfully`,
      type,
      id,
      voteType 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to record vote' },
      { status: 500 }
    )
  }
}
