"use client";

import { Smile, Meh, Frown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SentimentSelectorProps {
  value: "happy" | "neutral" | "sad"
  onChange: (sentiment: "happy" | "neutral" | "sad") => void
  className?: string
  disabled?: boolean
  isLoading?: boolean
}

export function SentimentSelector({ value, onChange, className, disabled = false, isLoading = false }: SentimentSelectorProps) {
  const [clickedSentiment, setClickedSentiment] = useState<"happy" | "neutral" | "sad" | null>(null)
  const sentiments = [
    {
      key: "happy" as const,
      icon: Smile,
      color: "text-sentiment-excellent",
      bgColor: "bg-sentiment-excellent/10"
    },
    {
      key: "neutral" as const,
      icon: Meh,
      color: "text-sentiment-neutral",
      bgColor: "bg-sentiment-neutral/10"
    },
    {
      key: "sad" as const,
      icon: Frown,
      color: "text-sentiment-poor",
      bgColor: "bg-sentiment-poor/10"
    }
  ]

  return (
    <div className={cn("flex gap-1", className)}>
      {sentiments.map((sentiment) => {
        const Icon = sentiment.icon
        const isSelected = value === sentiment.key

        return (
          <Button
            key={sentiment.key}
            variant="ghost"
            size="sm"
            onClick={() => {
              setClickedSentiment(sentiment.key)
              onChange(sentiment.key)
            }}
            disabled={disabled}
            className={cn(
              "h-8 w-8 p-0 transition-all",
              isSelected && [sentiment.bgColor, sentiment.color],
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {clickedSentiment === sentiment.key && isLoading && disabled ? <Loader2 className="h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" />}

          </Button>
        )
      })}
    </div>
  )
}