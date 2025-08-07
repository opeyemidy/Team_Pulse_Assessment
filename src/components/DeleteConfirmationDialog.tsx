import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import { Team } from '@/interfaces'
import React from 'react'
import { AlertDialogHeader, AlertDialogFooter } from './ui/alert-dialog'

interface DeleteConfirmationDialogProps {
    isDeleteDialogOpen: boolean
    setIsDeleteDialogOpen: (isOpen: boolean) => void
    handleDeleteTeam: () => void
    team: Team
}
export default function DeleteConfirmationDialog({ isDeleteDialogOpen, setIsDeleteDialogOpen, handleDeleteTeam, team }: DeleteConfirmationDialogProps) {
    return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the team &quot;{team.name}&quot;
                        and remove all {team.memberCount} team members from the system.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeleteTeam}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Delete Team
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
