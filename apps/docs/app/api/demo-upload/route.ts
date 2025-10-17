import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Create uploads directory if it doesn't exist
const uploadsDir = join(process.cwd(), 'public', 'uploads')

export async function POST(request: Request) {
    try {
        // Get the formData from the request
        const formData = await request.formData()

        console.log('formData', formData)

        // Try to extract the file
        const file = formData.get('file') as File | null

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        // Validate file size (1MB = 1,048,576 bytes)
        const maxSize = 1024 * 1024 // 1MB in bytes
        if (file.size > maxSize) {
            return NextResponse.json(
                {
                    error: 'File size exceeds 1MB limit',
                },
                { status: 400 },
            )
        }

        // Generate unique filename to avoid conflicts
        const timestamp = Date.now()
        const randomId = Math.random().toString(36).substring(2, 15)
        const fileExtension = file.name.split('.').pop() || ''
        const uniqueFileName = `${timestamp}-${randomId}.${fileExtension}`

        // Create uploads directory if it doesn't exist
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true })
        }

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const filePath = join(uploadsDir, uniqueFileName)

        await writeFile(filePath, buffer)

        // Get file metadata
        const name = file.name
        const size = file.size
        const type = file.type

        // Return file metadata with proper URL
        return NextResponse.json({
            id: randomId,
            name,
            size,
            type,
            url: `/uploads/${uniqueFileName}`,
            status: 'done',
            percent: 100,
        })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
    }
}
