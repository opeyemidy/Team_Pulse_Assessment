import { Users, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Team } from "@/interfaces"

interface TeamCardProps {
  team: Team
  onClick: ({ name, id }: { name: string, id: string }) => void
}

export function TeamCard({ team, onClick }: TeamCardProps) {
  const getSentimentColor = (score: number) => {
    if (score >= 80) return "sentiment-excellent"
    if (score >= 60) return "sentiment-good"
    if (score >= 40) return "sentiment-neutral"
    return "sentiment-poor"
  }

  const getSentimentLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Neutral"
    return "Needs Attention"
  }

  const TrendIcon = team.sentimentTrend === "up" ? TrendingUp :
    team.sentimentTrend === "down" ? TrendingDown : Minus

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 bg-gradient-card border-0 shadow-card"
      onClick={() => onClick({ name: team.name, id: team.id })}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-card-foreground">
            {team.name}
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            <Users className="h-3 w-3 mr-1" />
            {team.memberCount || 0}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Sentiment Score</p>
              <div className="flex items-center gap-2">
                <span
                  className="text-2xl font-bold"
                  style={{ color: `hsl(var(--${getSentimentColor(team.averageSentiment)}))` }}
                >
                  {team.averageSentiment}%
                </span>
                <TrendIcon
                  className={`h-4 w-4 ${team.sentimentTrend === "up" ? "text-sentiment-excellent" :
                    team.sentimentTrend === "down" ? "text-sentiment-poor" :
                      "text-muted-foreground"
                    }`}
                />
              </div>
            </div>

            <div className="text-right">
              <Badge
                variant="outline"
                className="border-current"
                style={{
                  color: `hsl(var(--${getSentimentColor(team.averageSentiment)}))`,
                  borderColor: `hsl(var(--${getSentimentColor(team.averageSentiment)}))`
                }}
              >
                {getSentimentLabel(team.averageSentiment)}
              </Badge>
            </div>
          </div>

          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${team.averageSentiment}%`,
                backgroundColor: `hsl(var(--${getSentimentColor(team.averageSentiment)}))`
              }}
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Last updated: {team.lastUpdated}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}