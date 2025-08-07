import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { AdminSettings } from '@/interfaces'
import React from 'react'
import { timeOptions } from './constants'

interface SettingsSummaryProps {
    settings: AdminSettings
}


export default function SettingsSummary({ settings }: SettingsSummaryProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Current Settings Summary</CardTitle>
                <CardDescription>
                    Overview of your current TeamPulse configuration
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Check-ins Status</Label>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${settings.checkInsEnabled ? 'bg-success' : 'bg-muted'}`} />
                            <span className="text-sm">{settings.checkInsEnabled ? 'Enabled' : 'Disabled'}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Frequency</Label>
                        <p className="text-sm text-muted-foreground capitalize">
                            {settings.checkInFrequency}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Reminders</Label>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${settings.autoReminders ? 'bg-success' : 'bg-muted'}`} />
                            <span className="text-sm">{settings.autoReminders ? 'Enabled' : 'Disabled'}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Reminder Time</Label>
                        <p className="text-sm text-muted-foreground">
                            {timeOptions.find(t => t.value === settings.reminderTime)?.label || settings.reminderTime}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
