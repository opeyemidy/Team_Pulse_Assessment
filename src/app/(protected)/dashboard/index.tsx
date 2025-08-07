"use client";

import { useState, useEffect } from "react"
import { Users } from "lucide-react"
import { TeamCard } from "@/components/TeamCard"
import { AddTeamModal } from "@/components/AddTeamModal"
import { LoadingCard } from "@/components/LoadingCard"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { mockTeams } from "@/data"
import { Team } from "@/interfaces"
import StatsCard from "@/components/StatsCard";
import StatsLoader from "@/components/StatsLoader";

export default function Dashboard() {
    const router = useRouter()
    const [teams, setTeams] = useState<Team[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading
        const loadData = async () => {
            await new Promise(resolve => setTimeout(resolve, 1500))
            setTeams(mockTeams)
            setIsLoading(false)
        }

        loadData()
    }, [])

    const handleAddTeam = (newTeamData: { name: string; description: string; }) => {
        const newTeam: Team = {
            id: (teams.length + 1).toString(),
            name: newTeamData.name,
            averageSentiment: 50, // Default neutral sentiment
            sentimentTrend: "stable",
            lastUpdated: "Just now"
        }

        setTeams(prev => [...prev, newTeam])
    }

    const handleTeamClick = (teamId: string) => {
        router.push(`/teams/${teamId}`)
    }

    const calculateOverallStats = () => {
        if (teams.length === 0) return { avgSentiment: 0, totalMembers: 0, teamsCount: 0 }

        const totalMembers = teams.reduce((sum, team) => sum + (team.memberCount || 0), 0)
        const avgSentiment = Math.round(
            teams.reduce((sum, team) => sum + team.averageSentiment, 0) / teams.length
        )

        return { avgSentiment, totalMembers, teamsCount: teams.length }
    }

    const stats = calculateOverallStats()

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Team Dashboard</h1>
                    <p className="text-muted-foreground">Monitor team sentiment and manage your organization</p>
                </div>
                <AddTeamModal onAddTeam={handleAddTeam} />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isLoading ? <StatsLoader /> : <StatsCard stats={stats} teams={teams} />}
            </div>

            {/* Teams Grid */}
            <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Your Teams</h2>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <LoadingCard key={i} />
                        ))}
                    </div>
                ) : teams.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.map((team) => (
                            <TeamCard
                                key={team.id}
                                team={team}
                                onClick={() => handleTeamClick(team.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <Card className="bg-gradient-sentiment border-0 shadow-card">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Users className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">No teams yet</h3>
                            <p className="text-muted-foreground text-center mb-6">
                                Get started by creating your first team to begin tracking sentiment and engagement.
                            </p>
                            <AddTeamModal onAddTeam={handleAddTeam} />
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}