
import { cn } from '@/lib/utils'
import React from 'react'
export function Heading({ children }: { children?: React.ReactNode }) {
    return <h1 className="text-4xl font-bold">{children}</h1>
}

export function Heading2({ children }: { children?: React.ReactNode }) {
    return <h1 className="text-3xl font-bold">{children}</h1>
}

export function Heading3({ children }: { children?: React.ReactNode }) {
    return <h1 className="text-2xl font-bold leading-3">{children}</h1>
}


export function Description({ children, className }: { children?: React.ReactNode, className? : string }) {
    return <p className={cn("text-md text-gray-500 my-2 max-w-[50rem]", className)}>{children}</p>
}