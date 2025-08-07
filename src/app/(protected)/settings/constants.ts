import { AdminSettings } from '@/interfaces';

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

export const defaultSettings: AdminSettings = {
  checkInsEnabled: true,
  checkInFrequency: 'daily',
  autoReminders: true,
  reminderTime: '09:00',
  allowAnonymous: false,
};
