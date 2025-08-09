import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Team } from '@/generated/prisma/client'
import React from 'react'

interface TeamStatsProps {
    team: Team & { membersCount: number }
}

export default function TeamStats({ team }: TeamStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{team.membersCount}</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Average Sentiment</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{team.averageSentiment}%</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Team Health</CardTitle>
                </CardHeader>
                <CardContent>
                    {team.membersCount > 0 && <div className="flex items-center gap-2">
                        <span className="text-lg">
                            {team.averageSentiment >= 80 ? "🟢" : team.averageSentiment >= 60 ? "🟡" : team.averageSentiment >= 40 ? "🟠" : "🔴"}
                        </span>
                        <Badge variant={team.averageSentiment >= 80 ? "default" : team.averageSentiment >= 60 ? "secondary" : team.averageSentiment >= 40 ? "destructive" : "outline"}>
                            {team.averageSentiment >= 80 ? "Healthy" : team.averageSentiment >= 60 ? "Fair / Monitor" : team.averageSentiment >= 40 ? "Needs Attention" : "Critical"}
                        </Badge>
                    </div>}
                    {team.membersCount === 0 && <div className="text-sm text-gray-500">No members yet</div>}
                </CardContent>
            </Card>
        </div>
    );
}
