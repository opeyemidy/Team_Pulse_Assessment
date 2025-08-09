import { calculateAverageSentiment } from '@/helpers';
import { DashboardStats } from '@/interfaces';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';

export const GET = withAuth(async () => {
  try {
    // Calculate total teams and members
    const totalTeams = await prisma.team.count();
    // members data and count
    const membersData = await prisma.member.findMany();
    const totalMembers = membersData.length;

    const response: DashboardStats = {
      totalTeams,
      totalMembers,
      averageSentiment: calculateAverageSentiment(membersData),
    };

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
});
