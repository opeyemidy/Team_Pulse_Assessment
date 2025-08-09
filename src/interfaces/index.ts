import { Sentiment } from '@/generated/prisma/client';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  sentiment: Sentiment;
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

export interface DashboardStats {
  totalTeams: number;
  totalMembers: number;
  averageSentiment: number;
}

export interface TeamAverage {
  teamId: string;
  averageSentiment: number;
}

export const sentimentScores: Record<Sentiment, number> = {
  HAPPY: 100,
  NEUTRAL: 50,
  SAD: 0,
};

export interface User {
  id: string;
  email: string;
  name: string;
}
export type Args = { params: Promise<{ [key: string]: string }> };

export interface AnalyticsData {
  date: string;
  fullDate: string;
  happy: number;
  neutral: number;
  sad: number;
  teamA: number;
  teamB: number;
  teamC: number;
  teamD: number;
}

export interface SignInError {
  success: boolean;
  errors?: Record<string, string[]>;
}
