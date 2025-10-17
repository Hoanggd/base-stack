import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function GET(request: NextRequest, { params }: { params: Promise<{ filename: string[] }> }) {
    try {
        const resolvedParams = await params
        const filename = resolvedParams.filename.join('/')

        // Security check: prevent directory traversal
        if (filename.includes('..') || filename.includes('\\')) {
            return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
        }

        // Construct the file path
        const uploadsDir = join(process.cwd(), 'public', 'uploads')
        const filePath = join(uploadsDir, filename)

        // Check if file exists
        if (!existsSync(filePath)) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 })
        }

        const fileBuffer = await readFile(filePath)
        const contentType = 'application/octet-stream'

        // Return the file with appropriate headers
        return new NextResponse(fileBuffer as any, {
            headers: {
                'Content-Type': contentType,
            },
        })
    } catch (error) {
        console.error('File serving error:', error)
        return NextResponse.json({ error: 'Failed to serve file' }, { status: 500 })
    }
}
