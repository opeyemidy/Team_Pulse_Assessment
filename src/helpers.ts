import { Member } from './generated/prisma/client';
import { AnalyticsData, sentimentScores } from './interfaces';

/**
 * Calculate average sentiment.
 */
export function calculateAverageSentiment(members: Member[]): number {
  if (members.length === 0) return 0;
  const total = members.reduce(
    (sum, m) => sum + sentimentScores[m.sentiment],
    0
  );
  return Math.round(total / members.length);
}

export const getSentimentColor = (score: number) => {
  if (score >= 90) return 'sentiment-excellent';
  if (score >= 75) return 'sentiment-good';
  if (score >= 50) return 'sentiment-neutral';
  if (score >= 25) return 'sentiment-poor';
  return 'sentiment-poor';
};

export const getSentimentLabel = (score: number) => {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 50) return 'Fair';
  if (score >= 25) return 'Poor';
  return 'Very Poor';
};
export const getProgressBarGradient = (score: number) => {
  // Create a gradient that transitions from red to yellow to green based on score
  if (score >= 75) {
    // Green range (75-100)
    return 'linear-gradient(90deg, hsl(var(--sentiment-good)) 0%, hsl(var(--sentiment-excellent)) 100%)';
  } else if (score >= 50) {
    // Yellow to green range (50-74)
    return 'linear-gradient(90deg, hsl(var(--sentiment-neutral)) 0%, hsl(var(--sentiment-good)) 100%)';
  } else if (score >= 25) {
    return 'linear-gradient(90deg, hsl(var(--sentiment-poor)) 0%, hsl(var(--sentiment-neutral)) 100%)';
  } else {
    // Very poor range (0-24)
    return 'linear-gradient(90deg, hsl(var(--sentiment-poor)) 0%, hsl(var(--sentiment-poor)) 100%)';
  }
};

// Mock data for sentiment trends
export const generateTrendData = (days: number): AnalyticsData[] => {
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      fullDate: date.toISOString().split('T')[0],
      happy: Math.floor(Math.random() * 30) + 40,
      neutral: Math.floor(Math.random() * 20) + 25,
      sad: Math.floor(Math.random() * 15) + 5,
      teamA: Math.floor(Math.random() * 25) + 60,
      teamB: Math.floor(Math.random() * 20) + 55,
      teamC: Math.floor(Math.random() * 30) + 45,
      teamD: Math.floor(Math.random() * 25) + 50,
    });
  }

  return data;
};
