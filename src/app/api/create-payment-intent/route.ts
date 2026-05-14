import { NextRequest, NextResponse } from 'next/server'

// This is a mock Stripe payment intent endpoint
// In production, you'd use Stripe's SDK with a secret key
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { amount } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Mock successful payment intent creation
    return NextResponse.json({
      clientSecret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).slice(2)}`,
      amount,
      status: 'requires_payment_method',
    })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
