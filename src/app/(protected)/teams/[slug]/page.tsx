import type { Metadata } from 'next'
import TeamDetails from './index'
import { notFound } from 'next/navigation'

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const slug = (await params).slug
    const name = slug.split(".").slice(0, -1).join(" ").replace(/-/g, " ")
    const teamId = slug.split(".").pop()
    if (!teamId) {
        throw notFound()
    }
    return {
        title: `TeamPulse - ${name}`,
        description: `View details for team ${teamId}`,
    }
}

export default async function TeamPage({ params }: Props) {
    const { slug } = await params
    const teamId = slug.split(".").pop()
    if (!teamId) {
        throw notFound()
    }
    return <TeamDetails teamId={teamId!} />
}