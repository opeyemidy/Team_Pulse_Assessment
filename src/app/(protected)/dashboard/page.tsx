import type { Metadata } from "next";
import Dashboard from ".";

export const metadata: Metadata = {
    title: "TeamPulse - Dashboard",
    description: "View your teams and their sentiment analysis",
};

export default function DashboardPage() {
    return (
        <Dashboard />
    )
}