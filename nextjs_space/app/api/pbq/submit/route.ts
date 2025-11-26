import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { pbqNumber, pbqType, userAnswer, score, isCorrect } = body ?? {}

    // Get or create session
    let sessionId = request.cookies.get('pbq_session_id')?.value
    
    if (!sessionId) {
      const session = await prisma.pBQSession.create({
        data: {}
      })
      sessionId = session?.id ?? ''
    }

    // Save attempt
    const attempt = await prisma.pBQAttempt.create({
      data: {
        sessionId: sessionId ?? '',
        pbqNumber: pbqNumber ?? 0,
        pbqType: pbqType ?? '',
        userAnswer: userAnswer ?? '',
        score: score ?? 0,
        isCorrect: isCorrect ?? false
      }
    })

    const response = NextResponse.json({
      success: true,
      attemptId: attempt?.id,
      score: attempt?.score
    })

    // Set session cookie
    response.cookies.set('pbq_session_id', sessionId ?? '', {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return response
  } catch (error) {
    console.error('Error saving PBQ attempt:', error)
    return NextResponse.json(
      { error: 'Failed to save attempt' },
      { status: 500 }
    )
  }
}
