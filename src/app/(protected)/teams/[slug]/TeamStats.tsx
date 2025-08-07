import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Team } from '@/interfaces'
import React from 'react'

interface TeamStatsProps {
    team: Team
}

export default function TeamStats({ team }: TeamStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{team.memberCount}</div>
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
                    <Badge variant={team.averageSentiment >= 70 ? "default" : "secondary"}>
                        {team.averageSentiment >= 70 ? "Healthy" : "Needs Attention"}
                    </Badge>
                </CardContent>
            </Card>
        </div>
    )
}
