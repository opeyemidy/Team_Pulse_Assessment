export interface TeamMember {
  id: string;
  name: string;
  email: string;
  sentiment: 'happy' | 'neutral' | 'sad';
  joinedDate: string;
  teamId: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  memberCount?: number;
  averageSentiment: number;
  sentimentTrend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

export interface AdminSettings {
  checkInsEnabled: boolean;
  checkInFrequency: 'daily' | 'weekly' | 'monthly';
  autoReminders: boolean;
  reminderTime: string;
  allowAnonymous: boolean;
}
