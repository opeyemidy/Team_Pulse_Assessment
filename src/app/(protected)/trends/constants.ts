export const teams = [
  { id: 'all', name: 'All Teams' },
  { id: 'teamA', name: 'Engineering Team' },
  { id: 'teamB', name: 'Design Team' },
  { id: 'teamC', name: 'Marketing Team' },
  { id: 'teamD', name: 'Sales Team' },
];

export const timeRanges = [
  { value: '7', label: 'Last 7 days' },
  { value: '14', label: 'Last 2 weeks' },
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 3 months' },
];

export const chartConfig = {
  happy: {
    label: 'Happy',
    color: 'hsl(var(--success))',
  },
  neutral: {
    label: 'Neutral',
    color: 'hsl(var(--warning))',
  },
  sad: {
    label: 'Sad',
    color: 'hsl(var(--destructive))',
  },
  teamA: {
    label: 'Engineering Team',
    color: 'hsl(var(--primary))',
  },
  teamB: {
    label: 'Design Team',
    color: 'hsl(var(--secondary))',
  },
  teamC: {
    label: 'Marketing Team',
    color: 'hsl(var(--accent))',
  },
  teamD: {
    label: 'Sales Team',
    color: 'hsl(var(--muted))',
  },
};
