export interface User {
    id: number
    name: string
    email: string
}

const users: User[] = Array(100)
    .fill(0)
    .map((_, i) => ({
        id: i,
        name: 'User ' + i,
        email: `user${i}@example.com`,
    }))

interface PageResult<T> {
    data: T[]
    nextCursor: number | null
    total: number
}

/**
 * Cursor-based pagination with search
 * @param after Cursor (the last ID from the previous page)
 * @param limit Number of items per page
 * @param query Optional search text (case-insensitive)
 */
export async function paginateUsers(after: number | null, query: string = ''): Promise<PageResult<User>> {
    await new Promise(resolve => setTimeout(resolve, 700))

    const limit = 10
    // Step 1: Filter by search query
    const filtered = query ? users.filter(u => u.name.toLowerCase().includes(query.toLowerCase())) : users

    // Step 2: Find the starting index based on cursor
    const startIndex = after !== null ? filtered.findIndex(u => u.id === after) + 1 : 0

    // Step 3: Slice for current page
    const data = filtered.slice(startIndex, startIndex + limit)

    // Step 4: Compute next cursor
    const nextCursor = data.length > 0 && startIndex + limit < filtered.length ? data[data.length - 1].id : null

    return {
        data,
        nextCursor,
        total: filtered.length,
    }
}
