// src/app/api/designs/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // TODO: replace with real data fetching
  return NextResponse.json({ message: 'Designs endpoint is live!' });
}
