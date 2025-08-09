# Team Pulse - Sentiment Tracking API Documentation

## Overview

This API provides comprehensive endpoints for managing team sentiment tracking, analytics, and reporting. The API follows RESTful conventions and returns JSON responses.

## Base URL

```
http://localhost:3000/api
```

## API Endpoints

### Dashboard Endpoints

#### `GET /api/dashboard`

Returns dashboard overview statistics.

**Response:**

```json
{
  "totalTeams": 5,
  "totalMembers": 42,
  "averageSentiment": "positive",
  "sentimentBreakdown": {
    "happy": 45,
    "neutral": 35,
    "sad": 20
  }
}
```

#### `GET /api/dashboard/teams`

Returns teams overview for dashboard cards.

**Response:**

```json
[
  {
    "id": "team_id",
    "name": "Development Team",
    "sentimentScore": 75,
    "lastUpdated": "2024-08-07T10:30:00Z"
  }
]
```

### Teams Management

#### `GET /api/teams`

Returns all teams.

**Response:**

```json
[
  {
    "id": "1",
    "name": "Engineering",
    "description": "Team responsible for product development",
    "memberCount": 6,
    "averageSentiment": 78,
    "sentimentTrend": "up",
    "lastUpdated": "2 hours ago"
  }
]
```

#### `POST /api/teams`

Creates a new team.

**Request Body:**

```json
{
  "name": "Team Name",
  "description": "Team description"
}
```

**Response:**

```json
{
  "id": "team_id",
  "name": "Team Name",
  "description": "Team description",
  "memberCount": 0,
  "averageSentiment": 0,
  "sentimentTrend": "stable",
  "lastUpdated": "2024-08-07T10:30:00Z"
}
```

#### `GET /api/teams/[id]`

Get detailed team information including members and health metrics.

**Response:**

```json
{
  "id": "team_id",
  "name": "Development Team",
  "description": "Main dev team",
  "totalMembers": 8,
  "averageSentiment": "positive",
  "teamHealth": "good",
  "healthScore": 72,
  "sentimentBreakdown": {
    "happy": 50,
    "neutral": 30,
    "sad": 20
  },
  "members": [
    {
      "id": "member_id",
      "name": "John Doe",
      "email": "john@company.com",
      "sentiment": "HAPPY",
      "joinDate": "2024-01-15T00:00:00Z",
      "lastResponse": "2024-08-07T09:00:00Z"
    }
  ]
}
```

#### `PUT /api/teams/[id]`

Update team information.

**Request Body:**

```json
{
  "name": "Updated Team Name",
  "description": "Updated description"
}
```

#### `DELETE /api/teams/[id]`

Delete a team (cascades to members and responses).

**Response:**

```json
{
  "message": "Team deleted successfully"
}
```

### Members Management

#### `POST /api/teams/[id]/members`

Add member to team.

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane@company.com",
  "sentiment": "neutral"
}
```

**Response:**

```json
{
  "id": "member_id",
  "name": "Jane Smith",
  "email": "jane@company.com",
  "sentiment": "neutral",
  "joinedDate": "2024-08-07",
  "teamId": "team_id"
}
```

#### `PUT /api/teams/[teamId]/members/[memberId]`

Update member information and sentiment.

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane.smith@company.com",
  "sentiment": "happy"
}
```

#### `DELETE /api/teams/[teamId]/members/[memberId]`

Remove member from team.

**Response:**

```json
{
  "message": "Member removed successfully"
}
```

### Analytics & Reporting

#### `GET /api/analytics/sentiment`

Get comprehensive sentiment analytics and trends.

**Query Parameters:**

- `teamId` (optional): Filter by specific team
- `period` (optional): Number of days for trend data (default: 30)

**Example:** `/api/analytics/sentiment?teamId=1&period=7`

**Response:**

```json
{
  "totalResponses": 156,
  "sentimentBreakdown": {
    "happy": 78,
    "neutral": 52,
    "sad": 26
  },
  "trends": [
    {
      "date": "2024-08-01",
      "happy": 65,
      "neutral": 25,
      "sad": 10,
      "totalResponses": 45
    }
  ],
  "averageScore": 75,
  "teamComparison": [
    {
      "teamId": "1",
      "teamName": "Engineering",
      "averageScore": 82,
      "totalMembers": 6,
      "sentimentBreakdown": {
        "happy": 4,
        "neutral": 2,
        "sad": 0
      }
    }
  ]
}
```

### Settings Management

#### `GET /api/settings`

Get current admin settings.

**Response:**

```json
{
  "checkInsEnabled": true,
  "checkInFrequency": "weekly",
  "autoReminders": true,
  "reminderTime": "09:00",
  "allowAnonymous": false
}
```

#### `PUT /api/settings`

Update admin settings.

**Request Body:**

```json
{
  "checkInsEnabled": true,
  "checkInFrequency": "daily",
  "autoReminders": false,
  "reminderTime": "10:30",
  "allowAnonymous": true
}
```

## Error Responses

All endpoints follow consistent error response format:

```json
{
  "error": "Error description"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created successfully
- `400` - Bad Request (validation error)
- `404` - Resource not found
- `409` - Conflict (duplicate resource)
- `500` - Internal server error

## Data Models

### Team

```typescript
interface Team {
  id: string;
  name: string;
  description: string;
  memberCount?: number;
  averageSentiment: number;
  sentimentTrend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}
```

### TeamMember

```typescript
interface TeamMember {
  id: string;
  name: string;
  email: string;
  sentiment: 'happy' | 'neutral' | 'sad';
  joinedDate: string;
  teamId: string;
}
```

### AdminSettings

```typescript
interface AdminSettings {
  checkInsEnabled: boolean;
  checkInFrequency: 'daily' | 'weekly' | 'monthly';
  autoReminders: boolean;
  reminderTime: string; // HH:MM format
  allowAnonymous: boolean;
}
```

## Future Enhancements

The following features would be implemented with a real database:

1. **SentimentResponse Model** - Track individual sentiment responses over time
2. **User Authentication** - Secure API endpoints with JWT tokens
3. **Real-time Updates** - WebSocket connections for live sentiment updates
4. **Email Notifications** - Automated reminders and alerts
5. **Advanced Analytics** - Predictive sentiment analysis and reporting
6. **Data Export** - CSV/Excel export functionality
7. **Audit Logs** - Track all API changes and user actions

## Rate Limiting

In production, these endpoints would include rate limiting:

- Dashboard endpoints: 100 requests/minute
- CRUD operations: 50 requests/minute
- Analytics endpoints: 20 requests/minute

## Authentication

Future implementation would require Bearer token authentication:

```
Authorization: Bearer <jwt_token>
```
