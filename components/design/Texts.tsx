
import React from 'react'
export function Heading({ children }: { children?: React.ReactNode }) {
    return <h1 className="text-4xl font-bold">{children}</h1>
}

export function Description({ children }: { children?: React.ReactNode }) {
    return <p className="text-md text-gray-500 my-2 max-w-[50rem]">{children}</p>
}