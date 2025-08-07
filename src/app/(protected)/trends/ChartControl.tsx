import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'

import { Filter } from 'lucide-react'
import React, { SetStateAction } from 'react'
import { timeRanges, teams } from './constants'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ChartControlProps {
    timeRange: string
    setTimeRange: (value: string) => void
    selectedTeam: string
    setSelectedTeam: (value: string) => void
    viewMode: string
    setViewMode: (value: SetStateAction<"sentiment" | "teams">) => void
}
export default function ChartControl({ timeRange, setTimeRange, selectedTeam, setSelectedTeam, viewMode, setViewMode }: ChartControlProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Filters:</span>
                        </div>

                        <Select value={timeRange} onValueChange={setTimeRange}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {timeRanges.map((range) => (
                                    <SelectItem key={range.value} value={range.value}>
                                        {range.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                            <SelectTrigger className="w-[160px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {teams.map((team) => (
                                    <SelectItem key={team.id} value={team.id}>
                                        {team.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant={viewMode === 'sentiment' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setViewMode('sentiment')}
                        >
                            By Sentiment
                        </Button>
                        <Button
                            variant={viewMode === 'teams' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setViewMode('teams')}
                        >
                            By Teams
                        </Button>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}
