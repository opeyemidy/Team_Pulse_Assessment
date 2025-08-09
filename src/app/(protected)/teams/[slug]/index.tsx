"use client"
import { useState, useMemo } from "react"
import { Edit2, Trash2, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddMemberModal } from "@/components/AddMemberModal"
import { EditTeamModal } from "@/components/EditTeamModal"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Team, Member } from "@/generated/prisma/client"
import { LoadingCard } from "@/components/LoadingCard"
import { Skeleton } from "@/components/ui/skeleton"
import TeamStats from "./TeamStats"
import MembersSection from "./MembersSection"
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog"
import useRequest from "@/hooks/use-swr"
import { ITEMS_PER_PAGE } from "@/app/constants"
import { api } from "@/services"
import { Sentiment } from "@/generated/prisma/client"
import { useSWRConfig } from "swr"
import { AxiosResponse } from "axios"
import { calculateAverageSentiment } from "@/helpers"





interface TeamPageProps {
    teamId: string
}

export default function TeamDetails({ teamId }: TeamPageProps) {
    const router = useRouter()
    const { toast } = useToast()
    const { mutate: mutateTeams } = useSWRConfig()
    const [isUpdatingMember, setIsUpdatingMember] = useState<string | null>(null)
    const [isDeletingMember, setIsDeletingMember] = useState<string | null>(null)
    const [isDeletingTeam, setIsDeletingTeam] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
    const [isEditTeamOpen, setIsEditTeamOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const { data: team, isLoading: isTeamLoading } = useRequest<{ data: Team & { members: Member[] } }>(`/teams/${teamId}`, {
        revalidateOnFocus: false,
    })

    const teamData = team?.data
    const teamMembers = team?.data?.members.sort((a, b) => a.name.localeCompare(b.name))
    const teamStats = teamData ? {
        ...teamData,
        membersCount: teamData?.members.length,
    } : null

    // Filter and paginate members
    const filteredMembers = useMemo(() => {
        return teamMembers?.filter(member =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery, teamMembers]) || []

    const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE || 0
    const paginatedMembers = filteredMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const handleSentimentUpdate = async (memberId: string, sentiment: Sentiment) => {
        setIsUpdatingMember(memberId)
        try {

            await api.post(`/teams/members/${memberId}`, {
                sentiment: sentiment
            })
            // mutate without revalidating
            await mutateTeams(`/teams/${teamId}`,
                (prev: AxiosResponse<{ data: Team & { members: Member[] } }> | undefined) => {

                    if (!prev) return prev;

                    const updatedMembers = prev.data.data.members.map(member =>
                        member.id === memberId
                            ? { ...member, sentiment }
                            : member
                    )
                    const newData = {
                        ...prev,
                        data: {
                            ...prev.data,
                            data: {
                                ...prev.data.data,
                                averageSentiment: calculateAverageSentiment(updatedMembers),
                                members: updatedMembers
                            }
                        }
                    };
                    return newData;
                },
                {
                    revalidate: false
                }
            );

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

            await api.delete(`/teams/members/${memberId}`)
            await mutateTeams(`/teams/${teamId}`,
                (prev: AxiosResponse<{ data: Team & { members: Member[] } }> | undefined) => {
                    if (!prev) return prev
                    const updatedMembers = prev.data.data.members.filter(member => member.id !== memberId)
                    const newData = {
                        ...prev,
                        data: {
                            ...prev.data,
                            data: { ...prev.data.data, members: updatedMembers, averageSentiment: calculateAverageSentiment(updatedMembers) }
                        }
                    }
                    return newData
                },
                { revalidate: false }
            )

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

    const handleEditTeam = async (teamData: { name: string; description: string }) => {
        try {
            const response = await api.patch(`/teams/${teamId}`, {
                name: teamData.name,
                description: teamData.description
            })
            if (response.status === 200) {
                toast({
                    title: "Team Updated",
                    description: "Team details have been updated successfully."
                })
            }
        } catch {
            toast({
                title: "Error",
                description: "Failed to update team."
            })
        }
    }

    const handleDeleteTeam = async () => {
        setIsDeletingTeam(true)
        try {
            // Simulate API call
            const response = await api.delete(`/teams/${teamId}`)
            if (response.status === 200) {
                toast({
                    title: "Team Deleted",
                    description: "Team has been deleted successfully."
                })
            }
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
    return (
        <div className="space-y-6">
            {/* Header */}
            {isTeamLoading ? <div className="flex items-center justify-between">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
            </div> :
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push("/dashboard")}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        {teamData && <div>
                            <div className="space-y-1 min-w-0">
                                <h1 className="text-2xl sm:text-3xl font-bold text-foreground break-words">{teamData.name}</h1>
                                <p className="text-sm sm:text-base text-muted-foreground break-words">{teamData.description}</p>
                            </div>
                        </div>}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                        <Button variant="outline" onClick={() => setIsEditTeamOpen(true)} size="sm" className="sm:size-default">
                            <Edit2 className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Edit Team</span>
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => setIsDeleteDialogOpen(true)}
                            disabled={isDeletingTeam}
                            size="sm"
                            className="sm:size-default"
                        >
                            {isDeletingTeam ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <Trash2 className="h-4 w-4" />
                            )}
                            <span className="hidden sm:inline">Delete Team</span>
                        </Button>
                    </div>
                </div>
            }
            {isTeamLoading ? <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
            </div> : teamStats && <TeamStats team={teamStats} />}
            <MembersSection
                setIsAddMemberOpen={setIsAddMemberOpen}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setCurrentPage={setCurrentPage}
                paginatedMembers={paginatedMembers}
                handleSentimentUpdate={handleSentimentUpdate}
                isUpdatingMember={isUpdatingMember}
                handleRemoveMember={handleRemoveMember}
                isDeletingMember={isDeletingMember}
                totalPages={totalPages}
                currentPage={currentPage}
                isTeamLoading={isTeamLoading}
            />

            {/* Modals */}
            <AddMemberModal
                isOpen={isAddMemberOpen}
                onClose={() => setIsAddMemberOpen(false)}
            />

            {teamStats && <EditTeamModal
                isOpen={isEditTeamOpen}
                onClose={() => setIsEditTeamOpen(false)}
                onEdit={handleEditTeam}
                team={teamStats}
            />}
            {/* Delete Confirmation Dialog */}
            {teamStats && <DeleteConfirmationDialog
                isDeleteDialogOpen={isDeleteDialogOpen}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                handleDeleteTeam={handleDeleteTeam}
                team={teamStats}
            />}
        </div>
    )
}