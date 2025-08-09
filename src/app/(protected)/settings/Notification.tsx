import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Bell, Clock } from 'lucide-react'
import React from 'react'
import { timeOptions } from './constants'
import { Label } from '@/components/ui/label'
import { Settings as PrismaSettings } from '@/generated/prisma/client'

interface NotificationSettingsProps {
    handleSettingChange: (key: keyof PrismaSettings, value: PrismaSettings[keyof PrismaSettings]) => void
    settings: Partial<PrismaSettings>
}

export default function NotificationSettings({ handleSettingChange, settings }: NotificationSettingsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Settings
                </CardTitle>
                <CardDescription>
                    Configure automatic reminders and notification timing
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="auto-reminders">Automatic Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                            Send automatic reminders for pending check-ins
                        </p>
                    </div>
                    <Switch
                        id="auto-reminders"
                        checked={settings.automaticReminders}
                        onCheckedChange={(checked) => handleSettingChange('automaticReminders', checked)}
                        disabled={!settings.checkInsEnabled}
                    />
                </div>

                <Separator />

                <div className="space-y-3">
                    <Label htmlFor="reminder-time" className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Reminder Time
                    </Label>
                    <Select
                        value={settings.reminderTime}
                        onValueChange={(value) => handleSettingChange('reminderTime', value)}
                        disabled={!settings.checkInsEnabled || !settings.automaticReminders}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {timeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                        Time of day when automatic reminders will be sent
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
