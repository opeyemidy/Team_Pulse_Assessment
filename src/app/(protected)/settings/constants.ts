import { Settings } from '@/generated/prisma/client';

export const frequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

export const timeOptions = [
  { value: '09:00', label: '9:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '17:00', label: '5:00 PM' },
];

export const defaultSettings: Omit<Settings, 'id' | 'updatedAt'> = {
  checkInsEnabled: true,
  frequency: 'daily',
  automaticReminders: true,
  reminderTime: '09:00',
  anonymousEnabled: false,
};
