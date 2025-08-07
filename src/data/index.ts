import { Team } from '../interfaces';

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Engineering',
    memberCount: 24,
    averageSentiment: 78,
    sentimentTrend: 'up',
    lastUpdated: '2 hours ago',
  },
  {
    id: '2',
    name: 'Product Design',
    memberCount: 12,
    averageSentiment: 85,
    sentimentTrend: 'up',
    lastUpdated: '4 hours ago',
  },
  {
    id: '3',
    name: 'Marketing',
    memberCount: 18,
    averageSentiment: 62,
    sentimentTrend: 'stable',
    lastUpdated: '1 hour ago',
  },
  {
    id: '4',
    name: 'Sales',
    memberCount: 15,
    averageSentiment: 45,
    sentimentTrend: 'down',
    lastUpdated: '30 minutes ago',
  },
  {
    id: '5',
    name: 'Customer Success',
    memberCount: 8,
    averageSentiment: 92,
    sentimentTrend: 'up',
    lastUpdated: '6 hours ago',
  },
];
