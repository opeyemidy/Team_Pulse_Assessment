import { SentimentSelector } from '@/components/SentimentSelector'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui/pagination'
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { TeamMember } from '@/interfaces'
import { Plus, Search, Table, Loader2, Trash2 } from 'lucide-react'
import React, { SetStateAction } from 'react'

interface MembersSectionProps {
    setIsAddMemberOpen: (isOpen: boolean) => void
    searchQuery: string
    setSearchQuery: (query: string) => void
    setCurrentPage: (value: SetStateAction<number>) => void
    paginatedMembers: TeamMember[]
    handleSentimentUpdate: (memberId: string, sentiment: "happy" | "neutral" | "sad") => void
    isUpdatingMember: string | null
    handleRemoveMember: (memberId: string) => void
    isDeletingMember: string | null
    totalPages: number
    currentPage: number
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
}: MembersSectionProps) {
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
                                            value={member.sentiment as "happy" | "neutral" | "sad"}
                                            onChange={(sentiment) => handleSentimentUpdate(member.id, sentiment)}
                                            disabled={isUpdatingMember === member.id}
                                            isLoading={!!isUpdatingMember}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>{member.joinedDate}</TableCell>
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
