'use server';

import { Sentiment } from '@/generated/prisma/client';
import { withServerActionAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createTeam = withServerActionAuth(
  async (user, formData: FormData) => {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    const team = await prisma.team.create({
      data: {
        name,
        description,
      },
    });

    redirect(
      `/teams/${team.name.toLowerCase().replace(/\s+/g, '-')}.${team.id}`
    );
  }
);

export const updateTeam = withServerActionAuth(
  async (user, formData: FormData) => {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const teamId = formData.get('teamId') as string;

    const team = await prisma.team.update({
      where: { id: teamId },
      data: { name, description },
    });
    revalidatePath(
      `/teams/${team.name.toLowerCase().replace(/\s+/g, '-')}.${team.id}`
    );
    redirect(
      `/teams/${team.name.toLowerCase().replace(/\s+/g, '-')}.${team.id}`
    );
  }
);

export const createMember = withServerActionAuth(
  async (user, formData: FormData) => {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const sentiment = formData.get('sentiment') as Sentiment;
    const slug = formData.get('slug') as string;
    const teamId = slug.split('.').pop() as string;

    await prisma.member.create({
      data: {
        name,
        email,
        sentiment,
        teamId,
      },
    });
    revalidatePath(`/teams/${slug}`);
    redirect(`/teams/${slug}`);
  }
);
