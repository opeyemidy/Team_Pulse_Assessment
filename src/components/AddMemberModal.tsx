import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SentimentSelector } from "@/components/SentimentSelector"
import { toast } from "@/hooks/use-toast"

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (member: { name: string; email: string; sentiment: "happy" | "neutral" | "sad" }) => void
}

export function AddMemberModal({ isOpen, onClose, onAdd }: AddMemberModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sentiment: "neutral" as "happy" | "neutral" | "sad"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      onAdd(formData)
      setFormData({ name: "", email: "", sentiment: "neutral" })
      onClose()
    } catch {
      toast({
        title: "Error",
        description: "Failed to add member."
      })
    } finally {
      setIsLoading(false)
    }

  }

  const handleClose = () => {
    setFormData({ name: "", email: "", sentiment: "neutral" })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Team Member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter member name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter member email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Initial Sentiment</Label>
            <SentimentSelector
              value={formData.sentiment}
              onChange={(sentiment) => setFormData(prev => ({ ...prev, sentiment }))}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}