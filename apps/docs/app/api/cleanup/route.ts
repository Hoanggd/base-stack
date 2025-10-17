import { NextResponse } from 'next/server'
import { readdir, unlink, stat } from 'fs/promises'
import { join } from 'path'

// Clean up files older than 24 hours
const MAX_AGE = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export async function POST() {
    try {
        const uploadsDir = join(process.cwd(), 'public', 'uploads')

        // Read all files in uploads directory
        const files = await readdir(uploadsDir)
        const now = Date.now()
        let deletedCount = 0

        for (const file of files) {
            const filePath = join(uploadsDir, file)
            const stats = await stat(filePath)

            // Check if file is older than MAX_AGE
            if (now - stats.mtime.getTime() > MAX_AGE) {
                await unlink(filePath)
                deletedCount++
                console.log(`Deleted old file: ${file}`)
            }
        }

        return NextResponse.json({
            message: `Cleaned up ${deletedCount} old files`,
            deletedCount,
        })
    } catch (error) {
        console.error('Cleanup error:', error)
        return NextResponse.json({ error: 'Failed to cleanup files' }, { status: 500 })
    }
}
