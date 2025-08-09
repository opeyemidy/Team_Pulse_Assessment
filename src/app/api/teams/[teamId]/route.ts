import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateAverageSentiment } from '@/helpers';
import { withAuth } from '@/lib/auth';
import { Args } from '@/interfaces';

export const GET = withAuth(
  async (
    request: Request,
    { params }: { params: Promise<{ [key: string]: string }> }
  ) => {
    try {
      const { teamId } = await params;
      const team = await prisma.team.findUnique({
        where: { id: teamId },
        include: { members: true },
      });

      if (!team) {
        return NextResponse.json({ error: 'Team not found' }, { status: 404 });
      }
      const members = team.members;
      if (team.averageSentiment === 0 && members.length > 0) {
        team.averageSentiment = calculateAverageSentiment(members);
        await prisma.team.update({
          where: { id: teamId },
          data: { averageSentiment: team.averageSentiment },
        });
      }

      return NextResponse.json({ data: team });
    } catch (error) {
      console.error('Team API error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch team' },
        { status: 500 }
      );
    }
  }
);

export const PATCH = withAuth(
  async (
    request: Request,
    { params }: { params: Promise<{ [key: string]: string }> }
  ) => {
    const { teamId } = await params;
    const { name, description } = await request.json();
    const team = await prisma.team.findUnique({
      where: { id: teamId },
    });
    if (team) {
      team.name = name;
      team.description = description;
      await prisma.team.update({
        where: { id: teamId },
        data: { name, description },
      });
    }

    return NextResponse.json({ message: 'Team updated successfully' });
  }
);

export const DELETE = withAuth(async (request: Request, { params }: Args) => {
  const { teamId } = await params;
  const team = await prisma.team.findUnique({
    where: { id: teamId },
  });
  if (team) {
    await prisma.team.delete({
      where: { id: teamId },
    });
  }
  return NextResponse.json({ message: 'Team deleted successfully' });
});
