import { Member, Sentiment, Team } from '@/generated/prisma/client';
export const members: Pick<
  Member,
  'name' | 'email' | 'sentiment' | 'teamId'
>[] = [
  {
    name: 'John Smith',
    email: 'john.smith@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Sarah Connor',
    email: 'sarah.connor@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Mike Wilson',
    email: 'mike.wilson@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    sentiment: Sentiment.SAD,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Jessica Brown',
    email: 'jessica.brown@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'David Lee',
    email: 'david.lee@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Lisa Wang',
    email: 'lisa.wang@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Tom Anderson',
    email: 'tom.anderson@company.com',
    sentiment: Sentiment.SAD,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Rachel Green',
    email: 'rachel.green@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Chris Taylor',
    email: 'chris.taylor@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Amanda Clark',
    email: 'amanda.clark@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Brian Martinez',
    email: 'brian.martinez@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Nicole Thompson',
    email: 'nicole.thompson@company.com',
    sentiment: Sentiment.SAD,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Kevin Garcia',
    email: 'kevin.garcia@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Stephanie White',
    email: 'stephanie.white@company.com',
    sentiment: Sentiment.SAD,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Marcus Johnson',
    email: 'marcus.johnson@company.com',
    sentiment: Sentiment.SAD,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Jennifer Lopez',
    email: 'jennifer.lopez@company.com',
    sentiment: Sentiment.SAD,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Ryan Miller',
    email: 'ryan.miller@company.com',
    sentiment: Sentiment.SAD,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Samantha Davis',
    email: 'samantha.davis@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Daniel Moore',
    email: 'daniel.moore@company.com',
    sentiment: Sentiment.SAD,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Laura Wilson',
    email: 'laura.wilson@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'James Taylor',
    email: 'james.taylor@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Michelle Adams',
    email: 'michelle.adams@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },
  {
    name: 'Alex Johnson',
    email: 'alex.johnson2@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vivob0000hsrfrk9k3bgc',
  },

  // Product Design Team - 12 people, 85% sentiment score
  // Need: 10 happy (100), 1 neutral (50), 1 sad (0) = (10*100 + 1*50 + 1*0) / 12 = 87.5% (close to 85%)
  // Adjusting to: 9 happy, 3 neutral, 0 sad = (9*100 + 3*50) / 12 = 87.5%
  // Let's try: 10 happy, 2 neutral = (10*100 + 2*50) / 12 = 83.3% (closer)
  {
    name: 'Maya Patel',
    email: 'maya.patel@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7j0004hsrffwmpyxbw',
  },
  {
    name: 'Oliver Chen',
    email: 'oliver.chen@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7j0004hsrffwmpyxbw',
  },
  {
    name: 'Sophia Kim',
    email: 'sophia.kim@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vix7j0004hsrffwmpyxbw',
  },
  {
    name: 'Ethan Brooks',
    email: 'ethan.brooks@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7j0004hsrffwmpyxbw',
  },
  {
    name: 'Isabella Martinez',
    email: 'isabella.martinez@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7j0004hsrffwmpyxbw',
  },
  {
    name: 'Lucas Thompson',
    email: 'lucas.thompson@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7j0004hsrffwmpyxbw',
  },
  {
    name: 'Zoe Anderson',
    email: 'zoe.anderson@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vix7j0004hsrffwmpyxbw',
  },
  {
    name: 'Nathan Garcia',
    email: 'nathan.garcia@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7j0004hsrffwmpyxbw',
  },
  {
    name: 'Chloe Williams',
    email: 'chloe.williams@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7j0004hsrffwmpyxbw',
  },
  {
    name: 'Logan Davis',
    email: 'logan.davis@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7j0004hsrffwmpyxbw',
  },
  {
    name: 'Grace Lee',
    email: 'grace.lee@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7j0004hsrffwmpyxbw',
  },
  {
    name: 'Mason Rodriguez',
    email: 'mason.rodriguez@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7j0004hsrffwmpyxbw',
  },

  // Marketing Team - 18 people, 62% sentiment score
  // Need: 11 happy, 7 neutral = (11*100 + 7*50) / 18 = 61.1% (close to 62%)
  {
    name: 'Ava Thompson',
    email: 'ava.thompson@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'Jackson Miller',
    email: 'jackson.miller@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'Mia Johnson',
    email: 'mia.johnson@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'Liam Wilson',
    email: 'liam.wilson@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'Charlotte Brown',
    email: 'charlotte.brown@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'Benjamin Davis',
    email: 'benjamin.davis@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'Harper Martinez',
    email: 'harper.martinez@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'Sebastian Garcia',
    email: 'sebastian.garcia@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'Amelia Rodriguez',
    email: 'amelia.rodriguez@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'Henry Lopez',
    email: 'henry.lopez@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'Evelyn Anderson',
    email: 'evelyn.anderson@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'Alexander Taylor',
    email: 'alexander.taylor@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'Abigail Thomas',
    email: 'abigail.thomas@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'Michael Jackson',
    email: 'michael.jackson@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'Emma White',
    email: 'emma.white@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'William Harris',
    email: 'william.harris@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'Madison Clark',
    email: 'madison.clark@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },
  {
    name: 'James Lewis',
    email: 'james.lewis@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0001hsrf2fakafid',
  },

  // Sales Team - 15 people, 45% sentiment score
  // Need: 6 happy, 3 neutral, 6 sad = (6*100 + 3*50 + 6*0) / 15 = 45%
  {
    name: 'Victoria Walker',
    email: 'victoria.walker@company.com',
    sentiment: Sentiment.SAD,
    teamId: 'cme2vix7j0003hsrfpe9ekswc',
  },
  {
    name: 'Christopher Hall',
    email: 'christopher.hall@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7j0003hsrfpe9ekswc',
  },
  {
    name: 'Natalie Allen',
    email: 'natalie.allen@company.com',
    sentiment: Sentiment.SAD,
    teamId: 'cme2vix7j0003hsrfpe9ekswc',
  },
  {
    name: 'Andrew Young',
    email: 'andrew.young@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vix7j0003hsrfpe9ekswc',
  },
  {
    name: 'Samantha Hernandez',
    email: 'samantha.hernandez@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7j0003hsrfpe9ekswc',
  },
  {
    name: 'Joshua King',
    email: 'joshua.king@company.com',
    sentiment: Sentiment.SAD,
    teamId: 'cme2vix7j0003hsrfpe9ekswc',
  },
  {
    name: 'Lauren Wright',
    email: 'lauren.wright@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7j0003hsrfpe9ekswc',
  },
  {
    name: 'Tyler Scott',
    email: 'tyler.scott@company.com',
    sentiment: Sentiment.SAD,
    teamId: 'cme2vix7j0003hsrfpe9ekswc',
  },
  {
    name: 'Hannah Green',
    email: 'hannah.green@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vix7j0003hsrfpe9ekswc',
  },
  {
    name: 'Brandon Adams',
    email: 'brandon.adams@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7j0003hsrfpe9ekswc',
  },
  {
    name: 'Kayla Baker',
    email: 'kayla.baker@company.com',
    sentiment: Sentiment.SAD,
    teamId: 'cme2vix7j0003hsrfpe9ekswc',
  },
  {
    name: 'Jonathan Gonzalez',
    email: 'jonathan.gonzalez@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7j0003hsrfpe9ekswc',
  },
  {
    name: 'Alexis Nelson',
    email: 'alexis.nelson@company.com',
    sentiment: Sentiment.SAD,
    teamId: 'cme2vix7j0003hsrfpe9ekswc',
  },
  {
    name: 'Zachary Carter',
    email: 'zachary.carter@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vix7j0003hsrfpe9ekswc',
  },
  {
    name: 'Morgan Mitchell',
    email: 'morgan.mitchell@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7j0003hsrfpe9ekswc',
  },

  // Customer Success Team - 8 people, 92% sentiment score
  // Need: 7 happy, 1 neutral = (7*100 + 1*50) / 8 = 93.75% (close to 92%)
  {
    name: 'Taylor Roberts',
    email: 'taylor.roberts@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0002hsrf505th9w9',
  },
  {
    name: 'Jordan Phillips',
    email: 'jordan.phillips@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0002hsrf505th9w9',
  },
  {
    name: 'Casey Campbell',
    email: 'casey.campbell@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0002hsrf505th9w9',
  },
  {
    name: 'Riley Parker',
    email: 'riley.parker@company.com',
    sentiment: Sentiment.NEUTRAL,
    teamId: 'cme2vix7i0002hsrf505th9w9',
  },
  {
    name: 'Morgan Evans',
    email: 'morgan.evans@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0002hsrf505th9w9',
  },
  {
    name: 'Avery Turner',
    email: 'avery.turner@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0002hsrf505th9w9',
  },
  {
    name: 'Quinn Collins',
    email: 'quinn.collins@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0002hsrf505th9w9',
  },
  {
    name: 'Peyton Edwards',
    email: 'peyton.edwards@company.com',
    sentiment: Sentiment.HAPPY,
    teamId: 'cme2vix7i0002hsrf505th9w9',
  },
];

export const mockTeams: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Engineering',
    description: 'Team responsible for product development and innovation',
    averageSentiment: 78,
  },
  {
    name: 'Product Design',
    description: 'Team responsible for product design and development',
    averageSentiment: 85,
  },
  {
    name: 'Marketing',
    description: 'Team responsible for marketing and sales',
    averageSentiment: 62,
  },
  {
    name: 'Sales',
    description: 'Team responsible for sales and customer success',
    averageSentiment: 45,
  },
  {
    name: 'Customer Success',
    description: 'Team responsible for customer success and support',
    averageSentiment: 92,
  },
];
