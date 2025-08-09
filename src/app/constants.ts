import { Settings } from '@/generated/prisma/client';

export const ITEMS_PER_PAGE = 10;
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const COOKIE_NAME = 'auth-token';

export const adminSettings: Partial<Settings> = {
  checkInsEnabled: true,
  frequency: 'weekly',
  automaticReminders: true,
  reminderTime: '09:00',
  anonymousEnabled: false,
};
