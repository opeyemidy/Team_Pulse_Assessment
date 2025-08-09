# Team Pulse

A modern team sentiment tracking application built with Next.js, Prisma, and TypeScript.

## Features

- Team sentiment tracking and analytics
- Real-time dashboard with sentiment trends
- Team management and member tracking
- Settings configuration for check-ins
- Beautiful, responsive UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd team_pulse
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your PostgreSQL database URL:

```
DATABASE_URL="postgresql://username:password@localhost:5432/team_pulse"
```

4. Set up the database:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with sample data
npm run prisma:seed
```

5. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Database Seeding

The application includes a comprehensive seed script that populates the database with sample data:

- **5 Teams**: Engineering, Product Design, Marketing, Sales, Customer Success
- **50 Members**: Distributed across teams with varying sentiment scores
- **Default Settings**: Pre-configured check-in settings

### Running the Seed

```bash
# Run the seed script
npm run prisma:seed

# Or use Prisma directly
npx prisma db seed
```

### Seed Data Structure

The seed creates:

- Teams with realistic sentiment scores (45-92%)
- Members with HAPPY, NEUTRAL, and SAD sentiments
- Proper relationships between teams and members
- Default application settings

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:seed` - Seed the database

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Database**: PostgreSQL with Prisma ORM
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **State Management**: SWR for data fetching

## Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── (protected)/     # Protected routes
│   ├── api/            # API routes
│   └── globals.css     # Global styles
├── components/         # Reusable components
│   └── ui/            # UI components
├── lib/               # Utilities and configurations
├── interfaces/        # TypeScript interfaces
└── generated/         # Generated Prisma client
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
