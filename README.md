# TeamPulse

An internal tool for managing teams and tracking employee sentiment, built with Next.js, TypeScript, and modern web technologies.

## 🌐 Live Demo

**[View Live Demo →](https://team-pulse-assessment.vercel.app)**

### Demo Credentials

- **Email**: `admin@teampulse.dev`
- **Password**: `password123`

_The demo includes sample data to showcase all features and functionality._

## 📋 Overview

TeamPulse is a comprehensive team management application that allows organizations to:

- Track and manage teams and their members
- Monitor employee sentiment (happy, neutral, sad)
- Visualize sentiment trends over time
- Configure application-wide settings for check-ins

## 🚀 Features

### ✅ Authentication

- Simple session-based authentication
- Hardcoded admin credentials for demo purposes
- Protected routes and middleware

### ✅ Dashboard

- Overview of all teams with average sentiment scores
- Quick team creation functionality
- Real-time sentiment calculations

### ✅ Team Management

- Create, edit, and delete teams
- Add and remove team members
- Update individual member sentiment status
- Search functionality for team members
- Pagination for teams with >10 members

### ✅ Sentiment Tracking

- Visual sentiment trends with interactive charts
- Weekly sentiment data visualization
- Team-specific sentiment analysis

### ✅ Admin Settings

- Toggle check-ins on/off globally
- Configure check-in frequency (daily, weekly, monthly)
- Persistent settings storage

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **State Management**: SWR for data fetching
- **Authentication**: Session-based with cookies

## 📁 Project Structure

```
team_pulse/
├── src/
│   ├── app/
│   │   ├── (protected)/
│   │   │   ├── dashboard/           # Dashboard overview page
│   │   │   ├── teams/[slug]/        # Dynamic team detail pages
│   │   │   ├── trends/              # Analytics and sentiment trends
│   │   │   ├── settings/            # Admin settings and configuration
│   │   │   └── layout.tsx           # Protected routes layout
│   │   ├── api/                     # API routes
│   │   │   ├── analytics/           # Analytics endpoints
│   │   │   ├── dashboard/stats/     # Dashboard statistics
│   │   │   ├── settings/            # Settings management
│   │   │   └── teams/               # Team and member CRUD
│   │   ├── login/                   # Authentication pages
│   │   ├── globals.css              # Global styles
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Landing page
│   ├── components/
│   │   ├── ui/                      # shadcn/ui components
│   │   ├── *Modal.tsx               # Modal components (Add/Edit)
│   │   ├── *Card.tsx                # Card components
│   │   ├── AppSidebar.tsx           # Main navigation sidebar
│   │   ├── AuthProvider.tsx         # Authentication context
│   │   └── DashboardHeader.tsx      # Dashboard header
│   ├── actions/                     # Server actions
│   │   ├── auth.ts                  # Authentication actions
│   │   └── index.ts                 # Exported actions
│   ├── hooks/                       # Custom React hooks
│   │   ├── use-swr.ts               # SWR data fetching hook
│   │   ├── use-mobile.ts            # Mobile detection hook
│   │   └── use-toast.ts             # Toast notifications
│   ├── lib/
│   │   ├── auth.ts                  # Authentication utilities
│   │   ├── prisma.ts                # Database client
│   │   └── utils.ts                 # Utility functions
│   ├── schemas/                     # Zod validation schemas
│   ├── interfaces/                  # TypeScript type definitions
│   ├── data/                        # Data access layer
│   ├── services.ts                  # API service configuration
│   └── helpers.ts                   # Helper functions
├── prisma/
│   ├── schema.prisma                # Database schema
│   ├── migrations/                  # Database migrations
│   └── seed.ts                      # Database seeding
├── public/                          # Static assets
├── API_DOCUMENTATION.md             # API documentation
├── components.json                  # shadcn/ui configuration
├── next.config.ts                   # Next.js configuration
└── package.json                     # Dependencies and scripts
```

## 🗄️ Database Schema

```prisma
model Team {
  id          String   @id @default(cuid())
  name        String
  description String?
  averageSentiment Int @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  members     Member[]
}
model Member {
  id        String              @id @default(cuid())
  name      String
  email     String              @unique
  sentiment Sentiment           @default(NEUTRAL)
  teamId    String
  team      Team                @relation(fields: [teamId], references: [id], onDelete: Cascade)
  createdAt DateTime            @default(now())
  updatedAt DateTime            @updatedAt
}
enum Sentiment {
  HAPPY
  NEUTRAL
  SAD
}
model Settings {
  id                    String   @id @default(cuid())
  checkInsEnabled       Boolean  @default(true)
  frequency             String   @default("weekly") // daily, weekly, monthly
  anonymousEnabled      Boolean  @default(false)
  reminderTime          String   @default("9:00") // 9:00, 12:00, 15:00, 17:00
  automaticReminders    Boolean  @default(false)
  updatedAt             DateTime @updatedAt
}
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/opeyemidy/Team_Pulse_Assessment.git
   cd teampulse
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```bash
   touch .env.local
   ```

   Add the following environment variables to `.env`:

   ```
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/team_pulse"

   # Authentication
   JWT_SECRET="your-jwt-secret-key-here"

   # Application
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   NODE_ENV="development"
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev

   # Optional: Seed the database
   npm run prisma:seed
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Default Login Credentials

- **Email**: `admin@teampulse.dev`
- **Password**: `password123`

## 📊 Features Demo

### Dashboard

- View all teams with calculated sentiment scores
- Add new teams with inline form
- Navigate to detailed team views

### Team Management

- **Add Members**: Quick form to add team members with initial sentiment
- **Update Sentiment**: Toggle member sentiment between happy/neutral/sad
- **Search**: Real-time search through team members
- **Pagination**: Automatic pagination for large teams

### Sentiment Trends

- Interactive line charts showing sentiment changes over time
- Filter by specific teams
- Mock data demonstrates weekly sentiment tracking

### Admin Settings

- **Check-in Controls**: Enable/disable system-wide check-ins
- **Frequency Settings**: Configure how often check-ins occur
- **Real-time Updates**: Settings persist and update immediately

## 🎨 UI/UX Features

### Design System

- Consistent design using shadcn/ui components
- Responsive layout for desktop and mobile
- Loading states and error handling

### Interactive Elements

- Hover effects and smooth transitions
- Modal dialogs for quick actions
- Toast notifications for user feedback
- Optimistic UI updates

## ⚡ Performance Optimizations

- **Server Components**: Leverage Next.js 14 App Router for optimal performance
- **Server Actions**: Direct server mutations without API overhead
- **SWR Caching**: Efficient data fetching and caching strategy
- **Pagination**: Limit data loading for large datasets

## 🔒 Security Considerations

- **Input Validation**: Zod schemas for all form inputs
- **SQL Injection Prevention**: Prisma ORM parameterized queries
- **Session Management**: Secure cookie-based sessions
- **CSRF Protection**: Built-in Next.js protections
- **Type Safety**: Full TypeScript coverage

## 🚀 Deployment

### Database Setup

1. Set up a PostgreSQL database (AWS RDS, Railway, Supabase, etc.)
2. Update `DATABASE_URL` in production environment
3. Run migrations: `npx prisma migrate deploy`

### Application Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables for Production

```
# Database
DATABASE_URL="your-production-database-url"

# Authentication
JWT_SECRET="your-production-jwt-secret"

# Application
NEXT_PUBLIC_BASE_URL="https://your-domain.com"
NODE_ENV="production"
```

## 📈 Future Enhancements

### Potential Improvements

- **Real-time Updates**: WebSocket integration for live sentiment updates
- **Advanced Analytics**: More detailed sentiment analytics and reporting
- **Email Notifications**: Automated check-in reminders
- **Role-based Access**: Different permission levels for users
- **API Integration**: Slack/Teams integration for sentiment collection
- **Export Features**: CSV/PDF export of sentiment data
- **Mobile App**: React Native companion app

### Technical Debt

- Add comprehensive testing suite (Jest, Playwright)
- Implement proper error boundaries
- Add API rate limiting
- Set up monitoring and logging
- Implement proper caching strategies

## 🤝 Contributing

This is a demonstration project for assessment purposes. The codebase follows modern React/Next.js patterns and is well-structured for future development.

## 📄 License

This project is for assessment purposes only.

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**
