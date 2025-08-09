'use client'

import { useState } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { teamSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { createTeam } from "@/actions";
import FormSubmitButton from './FormSubmitButton';


type CreateTeamForm = z.infer<typeof teamSchema>

export function AddTeamModal() {
  const [open, setOpen] = useState(false)
  const form = useForm<CreateTeamForm>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  })
  const { control, formState: { isValid, isSubmitting } } = form

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:shadow-primary transition-all duration-300">
          <Plus className="h-4 w-4 mr-2" />
          Add New Team
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Team</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form action={createTeam} className="space-y-4">
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

            <FormSubmitButton label="Create Team" disabled={!isValid} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}