export interface Team {
  id: string;
  name: string;
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
