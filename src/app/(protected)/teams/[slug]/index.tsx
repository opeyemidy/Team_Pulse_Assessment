"use client"
import { useState, useMemo, useEffect } from "react"
import { Edit2, Trash2, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AddMemberModal } from "@/components/AddMemberModal"
import { EditTeamModal } from "@/components/EditTeamModal"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { members, mockTeams } from "@/data"
import { Team, TeamMember } from "@/interfaces"
import { LoadingCard } from "@/components/LoadingCard"
import { Skeleton } from "@/components/ui/skeleton"
import { TableSkeleton } from "@/components/TableSkeleton"
import TeamStats from "./TeamStats"
import MembersSection from "./MembersSection"
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog"



const ITEMS_PER_PAGE = 10

interface TeamPageProps {
    teamId: string
}

export default function TeamDetails({ teamId }: TeamPageProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [team, setTeam] = useState<Team>(mockTeams.find(team => team.id === teamId)!)
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdatingMember, setIsUpdatingMember] = useState<string | null>(null)
    const [isDeletingMember, setIsDeletingMember] = useState<string | null>(null)
    const [isDeletingTeam, setIsDeletingTeam] = useState(false)
    const [userMembers, setUserMembers] = useState(members.filter((member) => member.teamId === teamId))
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
    const [isEditTeamOpen, setIsEditTeamOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    // Filter and paginate members
    const filteredMembers = useMemo(() => {
        return userMembers.filter(member =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery, userMembers])

    const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedMembers = filteredMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const handleSentimentUpdate = async (memberId: string, sentiment: "happy" | "neutral" | "sad") => {
        setIsUpdatingMember(memberId)
        try {

            await new Promise(resolve => setTimeout(resolve, 1500))

            setUserMembers(userMembers.map((member) =>
                member.id === memberId ? { ...member, sentiment: sentiment as "happy" | "neutral" | "sad" } : member
            ))

            toast({
                title: "Sentiment Updated",
                description: "Member sentiment has been updated successfully."
            })
        } catch {
            toast({
                title: "Error",
                description: "Failed to update sentiment."
            })
        }
        finally {
            setIsUpdatingMember(null)
        }
    }

    const handleRemoveMember = async (memberId: string) => {
        setIsDeletingMember(memberId)
        try {

            await new Promise(resolve => setTimeout(resolve, 1500))
            setUserMembers(userMembers.filter((member) => member.id !== memberId))

            toast({
                title: "Member Removed",
                description: "Team member has been removed successfully."
            })
        } catch {
            toast({
                title: "Error",
                description: "Failed to remove member."
            })
        } finally {
            setIsDeletingMember(null)
        }
    }

    const handleAddMember = (memberData: Pick<TeamMember, "name" | "email" | "sentiment">) => {
        const newMember = {
            ...memberData,
            joinedDate: new Date().toISOString().split('T')[0],
            teamId: teamId,
            id: Date.now().toString()
        }

        setUserMembers([...userMembers, newMember])

        toast({
            title: "Member Added",
            description: "New team member has been added successfully."
        })
    }

    const handleEditTeam = (teamData: { name: string; description: string }) => {
        setTeam(prev => ({ ...prev, ...teamData }))

        toast({
            title: "Team Updated",
            description: "Team details have been updated successfully."
        })
    }

    const handleDeleteTeam = async () => {
        setIsDeletingTeam(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            toast({
                title: "Team Deleted",
                description: "Team has been deleted successfully."
            })
            router.push("/dashboard")
        } catch {
            toast({
                title: "Error",
                description: "Failed to delete team."
            })
        }
        finally {
            setIsDeletingTeam(false)
        }
    }

    // Simulate API loading
    useEffect(() => {
        const loadTeamData = async () => {
            setIsLoading(true)
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500))
            setTeam(mockTeams.find(team => team.id === teamId)!)
            setIsLoading(false)
        }

        loadTeamData()
    }, [teamId])

    if (!team) {
        return <div>loading...</div>
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" disabled>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-64" />
                            <Skeleton className="h-4 w-96" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-24" />
                        <Skeleton className="h-10 w-28" />
                    </div>
                </div>

                {/* Stats Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                </div>

                {/* Table Skeleton */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-10 w-28" />
                        </div>
                        <div className="relative">
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <TableSkeleton rows={5} columns={5} />
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push("/dashboard")}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">{team.name}</h1>
                        <p className="text-muted-foreground">{team.description}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => setIsEditTeamOpen(true)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Team
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => setIsDeleteDialogOpen(true)}
                        disabled={isDeletingTeam}
                    >
                        {isDeletingTeam ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                            <Trash2 className="h-4 w-4 mr-2" />
                        )}
                        Delete Team
                    </Button>
                </div>
            </div>

            {/* Team Stats */}
            <TeamStats team={team} />

            {/* Members Section */}
            <MembersSection
                setIsAddMemberOpen={setIsAddMemberOpen}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setCurrentPage={setCurrentPage}
                paginatedMembers={paginatedMembers as unknown as TeamMember[]}
                handleSentimentUpdate={handleSentimentUpdate}
                isUpdatingMember={isUpdatingMember}
                handleRemoveMember={handleRemoveMember}
                isDeletingMember={isDeletingMember}
                totalPages={totalPages}
                currentPage={currentPage}
            />

            {/* Modals */}
            <AddMemberModal
                isOpen={isAddMemberOpen}
                onClose={() => setIsAddMemberOpen(false)}
                onAdd={handleAddMember}
            />

            <EditTeamModal
                isOpen={isEditTeamOpen}
                onClose={() => setIsEditTeamOpen(false)}
                onEdit={handleEditTeam}
                team={team}
            />
            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                isDeleteDialogOpen={isDeleteDialogOpen}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                handleDeleteTeam={handleDeleteTeam}
                team={team}
            />
        </div>
    )
}