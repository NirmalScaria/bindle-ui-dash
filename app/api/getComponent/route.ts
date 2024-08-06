"use server";

import type { NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import { getAppSS } from 'firebase-nextjs/server/auth';
import { Component } from '@/models/component';

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
    if(!params.has('componentId')) {
        return NextResponse.json({ message: "Component name is required", success: false })
    }
    const componentId: string = params.get('componentId')!
    const app = await getAppSS();
    const db = app.firestore();
    const componentRef = db.collection('Components').doc(componentId);
    const component: Component = (await componentRef.get()).data() as Component;
    if (!component) {
        return NextResponse.json({ message: `Component ${componentId} not found. Make sure the name is correct.`, success: false })
    }
    // const useTypescript: boolean = params.get('useTypescript') === 'true'
    if (!componentId) {
        return NextResponse.json({ message: "Component name is required", success: false })
    }
    return NextResponse.json({ message: "OK", success: true, component: JSON.stringify(component) })
}