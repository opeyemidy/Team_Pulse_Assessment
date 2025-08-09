import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { SentimentSelector } from "@/components/SentimentSelector"
import { createMemberSchema } from "@/schemas"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createMember } from "@/actions"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import FormSubmitButton from "./FormSubmitButton"
import { Sentiment } from "@/generated/prisma/client"
import { useParams } from "next/navigation"

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
}

type CreateMemberForm = z.infer<typeof createMemberSchema>

export function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {

  const { slug } = useParams();
  const form = useForm<CreateMemberForm>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: {
      name: "",
      email: "",
      sentiment: Sentiment.NEUTRAL
    }
  })
  const { control, formState: { isValid, isSubmitting } } = form

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Team Member</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form action={createMember} className="space-y-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter member name"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter member email"
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
              name="sentiment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Sentiment</FormLabel>
                  <FormControl>
                    <div>
                      <SentimentSelector
                        value={field.value as Sentiment}
                        onChange={(sentiment) => field.onChange(sentiment)}
                      />
                      <input type="hidden" name="sentiment" value={field.value} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <input type="hidden" name="slug" value={slug as string} />
            <div className="flex justify-end gap-2 pt-4">
              <FormSubmitButton label="Add Member" disabled={!isValid} />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}