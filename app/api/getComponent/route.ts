"use server";

import type { NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

type ResponseData = {
    message: string
}

type ComponentData = {
    name: string
    location: string
    dependencies: string[]
    content: string
}

const knownComponents: { [id: string]: ComponentData } = {
    "button": {
        name: 'Button',
        location: '.',
        dependencies: [

        ],
        content: `import React from 'react';
export function Button({ children }: { children: string }) {
    return <button>{children}</button>;
}`
    }
}

export async function GET(req: NextRequest, res: NextApiResponse<ResponseData>) {
    const params = req.nextUrl.searchParams
    const componentId: string | null = params.get('componentId')
    const useTypescript: boolean = params.get('useTypescript') === 'true'
    if (!componentId) {
        return NextResponse.json({ message: "Component ID is required", success: false })
    }
    if (componentId in knownComponents === false) {
        return NextResponse.json({ message: "Component ID is not recognized", success: false })
    }
    return NextResponse.json({ message: "Component found", success: true, component: JSON.stringify(knownComponents[componentId]) })
}