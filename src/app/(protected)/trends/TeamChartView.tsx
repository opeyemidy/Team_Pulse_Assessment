import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import React from 'react'
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Line, LineChart } from 'recharts'
import { chartConfig } from './constants'

interface TeamChartViewProps {
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
export default function TeamChartView({ trendData }: TeamChartViewProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Team Comparison</CardTitle>
                <CardDescription>
                    Overall sentiment scores by team over the selected time period
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
                                label={{ value: 'Sentiment Score', angle: -90, position: 'insideLeft' }}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="teamA"
                                stroke="var(--color-teamA)"
                                strokeWidth={2}
                                dot={{ fill: "var(--color-teamA)", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="teamB"
                                stroke="var(--color-teamB)"
                                strokeWidth={2}
                                dot={{ fill: "var(--color-teamB)", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="teamC"
                                stroke="var(--color-teamC)"
                                strokeWidth={2}
                                dot={{ fill: "var(--color-teamC)", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="teamD"
                                stroke="var(--color-teamD)"
                                strokeWidth={2}
                                dot={{ fill: "var(--color-teamD)", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
