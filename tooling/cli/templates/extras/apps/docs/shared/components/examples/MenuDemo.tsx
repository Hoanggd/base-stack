'use client'

import { Button } from '@workspace/ui/components/Button'
import { Menu, MenuItem, MenuPopover, MenuTrigger } from '@workspace/ui/components/Menu'
import { MenuIcon } from 'lucide-react'

export function MenuDemo() {
    return (
        <MenuTrigger>
            <Button aria-label="Menu" size="icon" variant="outline">
                <MenuIcon />
            </Button>
            <MenuPopover>
                <Menu>
                    <MenuItem>Open</MenuItem>
                    <MenuItem>Rename</MenuItem>
                    <MenuItem>Duplicate</MenuItem>
                </Menu>
            </MenuPopover>
        </MenuTrigger>
    )
}
