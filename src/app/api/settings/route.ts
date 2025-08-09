import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Settings } from '@/generated/prisma/client';

export const GET = withAuth(async () => {
  try {
    const settings = await prisma?.settings.findFirst();
    return NextResponse.json({ data: settings });
  } catch (error) {
    console.error('Get settings API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
});

export const PUT = withAuth(async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { id, ...updates } = body as Partial<Settings>;

    // Validate frequency if provided
    if (updates.frequency) {
      const validFrequencies = ['daily', 'weekly', 'monthly'];
      if (!validFrequencies.includes(updates.frequency)) {
        return NextResponse.json(
          {
            error:
              'Invalid check-in frequency. Must be one of: daily, weekly, monthly',
          },
          { status: 400 }
        );
      }
    }

    // Validate reminder time format if provided (HH:MM)
    if (updates.reminderTime) {
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(updates.reminderTime)) {
        return NextResponse.json(
          { error: 'Invalid reminder time format. Use HH:MM format (24-hour)' },
          { status: 400 }
        );
      }
    }

    await prisma?.settings.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Update settings API error:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
});
