import { Metadata } from "next";
import Settings from ".";

export const metadata: Metadata = {
    title: "TeamPulse - Settings",
    description: "Settings for the app"
}

export default function SettingsPage() {
    return <Settings />
}