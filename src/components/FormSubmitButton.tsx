'use client'
import React from 'react'
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

interface FormSubmitButtonProps {
    label: string;
    disabled?: boolean;
}

export default function FormSubmitButton({ label, disabled }: FormSubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending || disabled} className="w-full shadow-primary">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {label}
                </>
            ) : (
                label
            )}
        </Button>
    )
}
