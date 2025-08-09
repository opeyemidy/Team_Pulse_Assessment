import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateAverageSentiment } from '@/helpers';
import { withAuth } from '@/lib/auth';
import { Args } from '@/interfaces';

export const POST = withAuth(async (request: Request, { params }: Args) => {
  const { memberId } = await params;
  const { sentiment } = await request.json();
  const member = await prisma.member.findUnique({
    where: { id: memberId },
  });
  if (member) {
    await prisma.member.update({
      where: { id: memberId },
      data: { sentiment },
    });
  }
  const team = await prisma.team.findUnique({
    where: { id: member?.teamId },
    include: {
      members: true,
    },
  });
  if (team) {
    await prisma.team.update({
      where: { id: team.id },
      data: { averageSentiment: calculateAverageSentiment(team.members) },
    });
  }
  return NextResponse.json({ message: 'Sentiment updated successfully' });
});

export const DELETE = withAuth(async (request: Request, { params }: Args) => {
  const { memberId } = await params;
  const member = await prisma.member.findUnique({
    where: { id: memberId },
  });
  if (member) {
    await prisma.member.delete({
      where: { id: memberId },
    });
  }
  return NextResponse.json({ message: 'Member deleted successfully' });
});
