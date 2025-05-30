// src/app/api/checkout/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// ⚠️ Using your env var name per your setup:
if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
  throw new Error('🚨 NEXT_PUBLIC_STRIPE_SECRET_KEY is missing in your .env.local');
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);


export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}) as any);
  const origin = request.headers.get('origin') || 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: body.items ?? [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Custom T-Shirt' },
            unit_amount: 3500,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('❌ Stripe session creation error:', err);
    return NextResponse.json(
      { error: err.message || 'Unable to create checkout session' },
      { status: 500 }
    );
  }
}
