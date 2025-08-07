import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select'
import { Separator } from '@radix-ui/react-separator'
import { Switch } from '@radix-ui/react-switch'
import { SettingsIcon } from 'lucide-react'
import React from 'react'
import { frequencyOptions } from './constants'
import { AdminSettings } from '@/interfaces'
import { Label } from '@/components/ui/label'

interface CheckInSettingsProps {
    handleSettingChange: (key: keyof AdminSettings, value: AdminSettings[keyof AdminSettings]) => void
    settings: AdminSettings
}

export default function CheckInSettings({ handleSettingChange, settings }: CheckInSettingsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="w-5 h-5" />
                    Check-in Configuration
                </CardTitle>
                <CardDescription>
                    Control when and how often team members receive sentiment check-ins
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="check-ins-enabled">Enable Check-ins</Label>
                        <p className="text-sm text-muted-foreground">
                            Turn sentiment check-ins on or off for the entire application
                        </p>
                    </div>
                    <Switch
                        id="check-ins-enabled"
                        checked={settings.checkInsEnabled}
                        onCheckedChange={(checked) => handleSettingChange('checkInsEnabled', checked)}
                    />
                </div>

                <Separator />

                <div className="space-y-3">
                    <Label htmlFor="frequency">Check-in Frequency</Label>
                    <Select
                        value={settings.checkInFrequency}
                        onValueChange={(value: 'daily' | 'weekly' | 'monthly') =>
                            handleSettingChange('checkInFrequency', value)
                        }
                        disabled={!settings.checkInsEnabled}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {frequencyOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                        How often team members will receive check-in prompts
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="anonymous">Allow Anonymous Responses</Label>
                        <p className="text-sm text-muted-foreground">
                            Let team members submit sentiment without identifying themselves
                        </p>
                    </div>
                    <Switch
                        id="anonymous"
                        checked={settings.allowAnonymous}
                        onCheckedChange={(checked) => handleSettingChange('allowAnonymous', checked)}
                        disabled={!settings.checkInsEnabled}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
