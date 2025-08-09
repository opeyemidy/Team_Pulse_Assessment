import { calculateAverageSentiment } from '@/helpers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const teamsOverviewData = await prisma.team.findMany({
      include: {
        members: true,
      },
    });
    const teamsOverview = teamsOverviewData.map((team) => {
      // Get team members
      const teamMembers = team.members;

      const sentimentScore = calculateAverageSentiment(teamMembers);

      return {
        ...team,
        averageSentiment: sentimentScore,
        membersCount: teamMembers.length,
      };
    });

    return NextResponse.json({ data: teamsOverview });
  } catch (error) {
    console.error('Dashboard teams API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teams overview' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { name, description } = await request.json();
  const newTeam = {
    name,
    description,
  };
  await prisma.team.create({
    data: newTeam,
  });
  return NextResponse.json({
    message: 'Team added successfully',
    data: newTeam,
  });
}
