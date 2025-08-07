import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import React from 'react'

interface SummaryStatsProps {
    trendData: {
        date: string;
        fullDate: string;
        happy: number;
        neutral: number;
        sad: number;
        teamA: number;
        teamB: number;
        teamC: number;
        teamD: number;
    }[]
}
export default function SummaryStats({ trendData }: SummaryStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">Trend Direction</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-2xl font-bold text-success">+5.2%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">vs previous period</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">Most Positive Day</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {trendData[trendData.length - 1]?.date}
                    </div>
                    <p className="text-xs text-muted-foreground">Highest sentiment score</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">87%</div>
                    <p className="text-xs text-muted-foreground">Team participation</p>
                </CardContent>
            </Card>
        </div>
    )
}
