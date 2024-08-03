"use server";

import type { NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

type ResponseData = {
    message: string
}

export async function GET(req: NextRequest, res: NextApiResponse<ResponseData>) {
    const params = req.nextUrl.searchParams
    const componentId = params.get('componentId')
    const useTypescript = params.get('useTypescript') === 'true'
    if (!componentId) {
        return NextResponse.json({ message: "Component ID is required", success: false })
    }
    return NextResponse.json({ message: `Component ID: ${componentId}, useTypescript: ${useTypescript}`, success: true })
}