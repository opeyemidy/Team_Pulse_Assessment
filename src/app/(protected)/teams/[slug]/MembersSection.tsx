import { SentimentSelector } from '@/components/SentimentSelector'
import { EmptyTableState, TableSkeleton } from '@/components/TableSkeleton'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Member, Sentiment } from '@/generated/prisma/client'
import { Plus, Search, Loader2, Trash2 } from 'lucide-react'
import React, { SetStateAction } from 'react'

interface MembersSectionProps {
    setIsAddMemberOpen: (isOpen: boolean) => void
    searchQuery: string
    setSearchQuery: (query: string) => void
    setCurrentPage: (value: SetStateAction<number>) => void
    paginatedMembers: Member[]
    handleSentimentUpdate: (memberId: string, sentiment: Sentiment) => void
    isUpdatingMember: string | null
    handleRemoveMember: (memberId: string) => void
    isDeletingMember: string | null
    totalPages: number
    currentPage: number
    isTeamLoading: boolean
}

export default function MembersSection({
    setIsAddMemberOpen,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    paginatedMembers,
    handleSentimentUpdate,
    isUpdatingMember,
    handleRemoveMember,
    isDeletingMember,
    totalPages,
    currentPage,
    isTeamLoading,
}: MembersSectionProps) {

    if (isTeamLoading) {
        return (<Card>
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
        </Card>)
    }
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Team Members</CardTitle>
                    <Button onClick={() => setIsAddMemberOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Member
                    </Button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search members by name or email..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setCurrentPage(1) // Reset to first page when searching
                        }}
                        className="pl-10"
                    />
                </div>
            </CardHeader>

            <CardContent>
                {paginatedMembers.length === 0 ? <EmptyTableState message={searchQuery ? "No members found matching your search." : "No team members yet. Add your first member to get started."} /> : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Sentiment</TableHead>
                                <TableHead>Joined Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedMembers.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell className="font-medium">{member.name}</TableCell>
                                    <TableCell>{member.email}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <SentimentSelector
                                                value={member.sentiment}
                                                onChange={(sentiment) => handleSentimentUpdate(member.id, sentiment)}
                                                disabled={isUpdatingMember === member.id}
                                                isLoading={!!isUpdatingMember}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>{new Date(member.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRemoveMember(member.id)}
                                            disabled={isDeletingMember === member.id}
                                        >
                                            {isDeletingMember === member.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}


                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            onClick={() => setCurrentPage(page)}
                                            isActive={currentPage === page}
                                            className="cursor-pointer"
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
