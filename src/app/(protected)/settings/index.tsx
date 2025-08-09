"use client";

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Save, RotateCcw, Settings as SettingsIcon } from "lucide-react"
import { defaultSettings } from "./constants";
import CheckInSettings from "./CheckInSettings";
import NotificationSettings from "./Notification";
import SettingsSummary from "./SettingsSummary";
import useRequest from "@/hooks/use-swr";
import { Settings as PrismaSettings } from "@/generated/prisma/client";
import { adminSettings } from "@/app/constants";
import { api } from "@/services";
import { AxiosResponse } from "axios";
import { useSWRConfig } from "swr";
import SettingsLoader from "./SettingsLoader";

export default function Settings() {
    const [hasChanges, setHasChanges] = useState(false)
    const { toast } = useToast()
    const { mutate } = useSWRConfig()
    const { data, isLoading } = useRequest<{ data: PrismaSettings }>('/settings', {
        revalidateOnFocus: false,
    })
    const [settings, setSettings] = useState<Partial<PrismaSettings>>(adminSettings)
    const handleSettingChange = <K extends keyof PrismaSettings>(
        key: K,
        value: PrismaSettings[K]
    ) => {
        setSettings(prev => ({ ...prev, [key]: value }))
        setHasChanges(true)
    }

    const handleSave = async () => {
        // Simulate API call to save settings
        const res = await api.put('/settings', settings)
        if (res.status === 200) {
            toast({
                title: "Settings saved",
                description: "Your settings have been updated successfully.",
            })
            setHasChanges(false)
            await mutate('/settings', (prev: AxiosResponse<{ data: PrismaSettings }> | undefined) => {
                if (!prev) return prev
                return {
                    ...prev,
                    data: {
                        ...prev.data,
                        data: {
                            ...prev.data.data,
                            ...settings
                        }
                    }
                }
            }, {
                revalidate: false
            })
        }
    }

    const handleReset = async () => {
        try {
            await api.put('/settings', { ...defaultSettings, id: data?.data.id })
            await mutate('/settings', (prev: AxiosResponse<{ data: PrismaSettings }> | undefined) => {
                if (!prev) return prev
                return {
                    ...prev,
                    data: { ...prev.data, data: { ...prev.data.data, ...defaultSettings } }
                }
            }, {
                revalidate: false
            })
            toast({
                title: "Settings reset",
                description: "All settings have been reset to default values.",
            })
        } catch (error) {
            console.error(error)
            toast({
                title: "Error resetting settings",
                description: "Please try again.",
            })
        }

    }

    useEffect(() => {
        if (data?.data && !isLoading) {
            setSettings(data.data)
        }
    }, [data, isLoading])

    if (isLoading) {
        return <SettingsLoader />
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
                    <Button onClick={handleReset} variant="outline" size="sm" disabled={isLoading}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset to Default
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!hasChanges || isLoading}
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