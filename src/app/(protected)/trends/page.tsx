import { Metadata } from 'next'
import React from 'react'
import Trends from './index'

export const metadata: Metadata = {
    title: 'Team Pulse - Trends',
    description: 'View team sentiment trends over time',
}

export default function TrendsPage() {
    return (
        <Trends />
    )
}
