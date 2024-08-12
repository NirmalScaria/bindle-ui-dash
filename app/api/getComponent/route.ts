"use server";

import { Component, PublishedComponent } from '@/models/component';
import { getAppSS } from 'firebase-nextjs/server/auth';
import type { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

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
    if (!params.has('componentId')) {
        return NextResponse.json({ message: "Component name is required", success: false })
    }
    const componentId: string = params.get('componentId')!
    const app = await getAppSS();
    const db = app.firestore();
    const componentRef = db.collection('Components').doc(componentId);
    const component: PublishedComponent = (await componentRef.get()).data() as PublishedComponent;
    if (!component) {
        return NextResponse.json({ message: `Component ${componentId} not found. Make sure the name is correct.`, success: false })
    }
    // const useTypescript: boolean = params.get('useTypescript') === 'true'
    if (!componentId) {
        return NextResponse.json({ message: "Component name is required", success: false })
    }
    try {
        await componentRef.update({
            installCount: (component.installCount ?? 0) + 1
        })
    }
    catch (e) {
        console.error(e)
    }
    return NextResponse.json({ message: "OK", success: true, component: JSON.stringify(component) })
}