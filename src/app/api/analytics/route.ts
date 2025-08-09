import { generateTrendData } from '@/helpers';
import { withAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const GET = withAuth(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const days = searchParams.get('days') || '7';

  try {
    const data = generateTrendData(parseInt(days));
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
});
