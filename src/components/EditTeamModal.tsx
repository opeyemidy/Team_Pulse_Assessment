"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Team } from "@/generated/prisma/client"
import { teamSchema } from "@/schemas"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import FormSubmitButton from "./FormSubmitButton"
import { updateTeam } from "@/actions"
import { useEffect } from "react"

interface EditTeamModalProps {
  isOpen: boolean
  onClose: () => void
  onEdit: (team: { name: string; description: string }) => void
  team: Pick<Team, "name" | "description" | "id">
}

type EditTeamForm = z.infer<typeof teamSchema>

export function EditTeamModal({ isOpen, onClose, team }: EditTeamModalProps) {
  const form = useForm<EditTeamForm>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: team.name,
      description: team.description || ""
    }
  })
  const { control, formState: { isValid, isSubmitting } } = form

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: team.name,
        description: team.description || ""
      })
    }
  }, [form, isOpen, team])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Team Details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form action={updateTeam} className="space-y-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your team name"
                      autoComplete="team-name"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your team description"
                      autoComplete="team-description"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <input type="hidden" name="teamId" value={team.id} />
            <FormSubmitButton label="Update Team" disabled={!isValid} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}