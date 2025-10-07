'use client'

import { useTheme } from '@/shared/components/ThemeProvider'
import { Button } from '@workspace/ui/components/Button'
import { MoonStar, SunIcon } from 'lucide-react'

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()

    return (
        <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <SunIcon /> : <MoonStar />}
        </Button>
    )
}
