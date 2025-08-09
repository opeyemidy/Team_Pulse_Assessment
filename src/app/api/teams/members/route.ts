import { NextResponse } from 'next/server';
import { members } from '@/data';
import { Sentiment } from '@/generated/prisma/client';

export async function POST(request: Request) {
  const { name, email, teamId } = await request.json();
  const newMember = {
    id: `${members.length + 1}`,
    name,
    email,
    teamId,
    sentiment: 'neutral' as Sentiment,
    joinedDate: new Date().toISOString(),
  };
  members.push(newMember);
  return NextResponse.json({
    message: 'Member added successfully',
    data: newMember,
  });
}
