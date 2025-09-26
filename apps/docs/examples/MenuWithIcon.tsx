'use client'

import { Button } from '@workspace/ui/components/Button'
import { Menu, MenuItem, MenuPopover, MenuTrigger } from '@workspace/ui/components/Menu'
import { MenuIcon, FolderOpen, Pencil, Copy, Share2, Trash2 } from 'lucide-react'

export function MenuWithIcon() {
    return (
        <MenuTrigger>
            <Button aria-label="Menu" size="icon" variant="outline">
                <MenuIcon />
            </Button>
            <MenuPopover>
                <Menu>
                    <MenuItem>
                        <FolderOpen className="size-4" />
                        Open
                    </MenuItem>
                    <MenuItem>
                        <Pencil className="size-4" />
                        Rename
                    </MenuItem>
                    <MenuItem>
                        <Copy className="size-4" />
                        Duplicate
                    </MenuItem>
                    <MenuItem>
                        <Share2 className="size-4" />
                        Share
                    </MenuItem>
                    <MenuItem>
                        <Trash2 className="size-4" />
                        Delete
                    </MenuItem>
                </Menu>
            </MenuPopover>
        </MenuTrigger>
    )
}
