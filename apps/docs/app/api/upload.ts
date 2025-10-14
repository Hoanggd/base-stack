import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    // Get the formData from the request
    const formData = await request.formData()

    // Try to extract the file
    const file = formData.get('file') as File | null

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Get file extension
    const name = file.name
    const size = file.size
    const type = name.split('.').pop() || ''

    // Return fake file metadata
    return NextResponse.json({
        id: Math.random().toString(36).substring(2, 15),
        name,
        size,
        type,
        url: `/uploads/${name}`,
        status: 'done',
        percent: 100,
    })
}
