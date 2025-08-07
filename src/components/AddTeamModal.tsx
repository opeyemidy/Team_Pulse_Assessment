import { useState } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus } from "lucide-react"
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
import { useToast } from "@/hooks/use-toast"
import { createTeamSchema } from "@/schemas/createTeam"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

interface AddTeamModalProps {
  onAddTeam: (team: { name: string; description: string; }) => void
}
type CreateTeamForm = z.infer<typeof createTeamSchema>

export function AddTeamModal({ onAddTeam }: AddTeamModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const form = useForm<CreateTeamForm>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  })
  const onSubmit = async (data: CreateTeamForm) => {
    if (!data.name.trim()) {
      toast({
        title: "Error",
        description: "Team name is required",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      onAddTeam({
        name: data.name,
        description: data.description,
      })

      toast({
        title: "Success",
        description: `Team "${data.name}" has been created successfully`
      })

      // Reset form and close modal
      form.reset()
      setOpen(false)
    } catch {
      toast({
        title: "Error",
        description: "Failed to create team. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
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
              control={form.control}
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

            <Button
              type="submit"
              className="w-full shadow-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating team...
                </>
              ) : (
                "Create Team"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}