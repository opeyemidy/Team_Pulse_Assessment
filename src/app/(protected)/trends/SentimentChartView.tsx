import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import React from 'react'
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Line, LineChart } from 'recharts'
import { teams, chartConfig } from './constants'

interface SentimentChartViewProps {
    selectedTeam: string
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

export default function SentimentChartView({ selectedTeam, trendData }: SentimentChartViewProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sentiment Distribution Over Time</CardTitle>
                <CardDescription>
                    Daily breakdown of happy, neutral, and sad responses
                    {selectedTeam !== 'all' && ` for ${teams.find(t => t.id === selectedTeam)?.name}`}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                            <XAxis
                                dataKey="date"
                                className="text-xs fill-muted-foreground"
                            />
                            <YAxis
                                className="text-xs fill-muted-foreground"
                                label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="happy"
                                stroke="var(--color-happy)"
                                strokeWidth={2}
                                dot={{ fill: "var(--color-happy)", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="neutral"
                                stroke="var(--color-neutral)"
                                strokeWidth={2}
                                dot={{ fill: "var(--color-neutral)", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="sad"
                                stroke="var(--color-sad)"
                                strokeWidth={2}
                                dot={{ fill: "var(--color-sad)", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
