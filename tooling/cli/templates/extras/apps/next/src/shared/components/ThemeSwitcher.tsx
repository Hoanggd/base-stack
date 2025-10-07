'use client'

import { useMounted } from '@/shared/hooks/useMounted'
import { Button } from '@workspace/ui/components/Button'
import { MoonStar, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()
    const mounted = useMounted()

    return (
        <Button variant="outline" size="icon" onClick={() => setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)}>
            {mounted && (theme === Theme.DARK ? <SunIcon /> : <MoonStar />)}
            {!mounted && <div className="size-[14px]" />}
        </Button>
    )
}
