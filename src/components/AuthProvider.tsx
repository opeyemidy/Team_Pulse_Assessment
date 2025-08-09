import { requireAuth } from '@/lib/auth';
import React from 'react'

export default async function AuthProvider({ children }: { children: React.ReactNode }) {
    await requireAuth();
    return (<>{children}</>);
}
