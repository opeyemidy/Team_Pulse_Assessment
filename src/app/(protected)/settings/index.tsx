"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Save, RotateCcw, Settings as SettingsIcon } from "lucide-react"
import { AdminSettings } from "@/interfaces";
import { defaultSettings } from "./constants";
import CheckInSettings from "./CheckInSettings";
import NotificationSettings from "./Notification";
import SettingsSummary from "./SettingsSummary";

export default function Settings() {
    const [settings, setSettings] = useState<AdminSettings>(defaultSettings)
    const [hasChanges, setHasChanges] = useState(false)
    const { toast } = useToast()

    const handleSettingChange = <K extends keyof AdminSettings>(
        key: K,
        value: AdminSettings[K]
    ) => {
        setSettings(prev => ({ ...prev, [key]: value }))
        setHasChanges(true)
    }

    const handleSave = () => {
        // Simulate API call to save settings
        setTimeout(() => {
            toast({
                title: "Settings saved",
                description: "Your settings have been updated successfully.",
            })
            setHasChanges(false)
        }, 500)
    }

    const handleReset = () => {
        setSettings(defaultSettings)
        setHasChanges(true)
        toast({
            title: "Settings reset",
            description: "All settings have been reset to default values.",
        })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Admin Settings</h1>
                    <p className="text-muted-foreground">
                        Configure global settings for TeamPulse check-ins and notifications
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {hasChanges && (
                        <Badge variant="secondary">
                            <SettingsIcon className="w-3 h-3 mr-1" />
                            Unsaved changes
                        </Badge>
                    )}
                    <Button onClick={handleReset} variant="outline" size="sm">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset to Default
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className="bg-primary hover:bg-primary/90"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Save Settings
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {/* Check-in Configuration */}
                <CheckInSettings handleSettingChange={handleSettingChange} settings={settings} />

                {/* Notification Settings */}
                <NotificationSettings handleSettingChange={handleSettingChange} settings={settings} />
            </div>

            {/* Current Settings Summary */}
            <SettingsSummary settings={settings} />
        </div>
    )
}