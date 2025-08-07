import { Users, BarChart3, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Team } from "@/interfaces";

interface StatsCardProps {
    stats: { teamsCount: number, totalMembers: number, avgSentiment: number }
    teams: Team[]
}

export default function StatsCard({ stats, teams }: StatsCardProps) {
    return (
        <>
            <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
                    <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stats.teamsCount}</div>
                    <p className="text-xs text-muted-foreground">
                        {teams.length > 0 ? "Active teams in your organization" : "No teams yet"}
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                    <BarChart3 className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stats.totalMembers}</div>
                    <p className="text-xs text-muted-foreground">
                        Across all teams
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Sentiment</CardTitle>
                    <TrendingUp className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stats.avgSentiment}%</div>
                    <p className="text-xs text-muted-foreground">
                        Organization-wide average
                    </p>
                </CardContent>
            </Card>
        </>
    )
}