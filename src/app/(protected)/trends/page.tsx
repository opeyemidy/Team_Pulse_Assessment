'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, TrendingUp } from "lucide-react"
import SentimentChartView from "./SentimentChartView"
import TeamChartView from "./TeamChartView"
import SummaryStats from "./SummaryStats"
import ChartControl from "./ChartControl"

// Mock data for sentiment trends
const generateTrendData = (days: number) => {
    const data = []
    const today = new Date()

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)

        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            fullDate: date.toISOString().split('T')[0],
            happy: Math.floor(Math.random() * 30) + 40,
            neutral: Math.floor(Math.random() * 20) + 25,
            sad: Math.floor(Math.random() * 15) + 5,
            teamA: Math.floor(Math.random() * 25) + 60,
            teamB: Math.floor(Math.random() * 20) + 55,
            teamC: Math.floor(Math.random() * 30) + 45,
            teamD: Math.floor(Math.random() * 25) + 50,
        })
    }

    return data
}



export default function Trends() {
    const [selectedTeam, setSelectedTeam] = useState('all')
    const [timeRange, setTimeRange] = useState('7')
    const [viewMode, setViewMode] = useState<'sentiment' | 'teams'>('sentiment')

    const trendData = generateTrendData(parseInt(timeRange))

    const handleExport = () => {
        const csvContent = [
            ['Date', 'Happy', 'Neutral', 'Sad'].join(','),
            ...trendData.map(row => [row.fullDate, row.happy, row.neutral, row.sad].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `sentiment-trends-${selectedTeam}-${timeRange}days.csv`
        a.click()
    }

    const getAverageSentiment = () => {
        const total = trendData.reduce((acc, day) => acc + day.happy + day.neutral + day.sad, 0)
        const happy = trendData.reduce((acc, day) => acc + day.happy, 0)
        return ((happy / total) * 100).toFixed(1)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Sentiment Trends</h1>
                    <p className="text-muted-foreground">
                        Track team sentiment changes over time and identify patterns
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {getAverageSentiment()}% avg positive
                    </Badge>
                    <Button onClick={handleExport} variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                    </Button>
                </div>
            </div>

            {/* Controls */}
            <ChartControl timeRange={timeRange} setTimeRange={setTimeRange} selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} viewMode={viewMode} setViewMode={setViewMode} />

            {/* Charts */}
            {viewMode === 'sentiment' ? (
                <SentimentChartView selectedTeam={selectedTeam} trendData={trendData} />
            ) : (
                <TeamChartView trendData={trendData} />
            )}

            {/* Summary Stats */}
            <SummaryStats trendData={trendData} />
        </div>
    )
}