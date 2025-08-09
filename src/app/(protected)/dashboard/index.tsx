"use client";

import { Users } from "lucide-react"
import { TeamCard } from "@/components/TeamCard"
import { LoadingCard } from "@/components/LoadingCard"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { DashboardStats } from "@/interfaces"
import StatsCard from "@/components/StatsCard";
import StatsLoader from "@/components/StatsLoader";
import useRequest from "@/hooks/use-swr";
import { Team } from "@/generated/prisma/client";
import { AddTeamModal } from "@/components/AddTeamModal";


interface TeamWithMembers extends Team {
    membersCount: number
}

export default function Dashboard() {
    const router = useRouter()

    const { data: dashboardStats, isLoading: isDashboardStatsLoading } = useRequest<{ data: DashboardStats }>('/dashboard/stats', {
        revalidateOnFocus: false,
    })

    const { data: teamsData, isLoading: isTeamsLoading } = useRequest<{ data: TeamWithMembers[] }>('/teams', {
        revalidateOnFocus: false,
    })
    //default sort by createdAt descending
    const teams = teamsData?.data.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()) || []

    const handleTeamClick = (name: string, teamId: string) => {
        router.push(`/teams/${name.toLowerCase().replace(/\s+/g, "-")}.${teamId}`)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Team Dashboard</h1>
                    <p className="text-muted-foreground">Monitor team sentiment and manage your organization</p>
                </div>
                <AddTeamModal
                />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isDashboardStatsLoading ? (
                    <StatsLoader />
                ) : (
                    dashboardStats?.data && <StatsCard
                        stats={dashboardStats.data}
                    />
                )}
            </div>

            {/* Teams Grid */}
            <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Your Teams</h2>

                {isTeamsLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <LoadingCard key={i} />
                        ))}
                    </div>
                ) : teams && teams.length && teams.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.map((team) => (
                            <TeamCard
                                key={team.id}
                                team={team}
                                onClick={() => handleTeamClick(team.name, team.id)}
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
                            {/* <AddTeamModal onAddTeam={handleAddTeam} /> */}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}