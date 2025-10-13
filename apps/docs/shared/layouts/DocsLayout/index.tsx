'use client'

import { CrossIcon } from '@/shared/layouts/DocsLayout/Icons'
import { ModulePicker } from '@/shared/layouts/DocsLayout/ModulePicker'
import { SidebarHeader } from '@/shared/layouts/DocsLayout/SidebarHeader'
import { SidebarMenu } from '@/shared/layouts/DocsLayout/SidebarMenu'
import React from 'react'
import { HamburgerMenu } from '@/shared/layouts/DocsLayout/HamburgerMenu'
import { TopNavLinks } from '@/shared/layouts/TopNavLinks'
import { HeaderIconButtons } from '@/shared/layouts/HeaderIconButtons'
import { useIsMobile } from '@workspace/ui/hooks/use-mobile'

export function DocsLayout({ children, tocs }: { children: React.ReactNode; tocs: React.ReactNode }) {
    const isMobile = useIsMobile({ breakpoint: 1024 })

    return (
        <>
            <div className="container w-full max-w-[1400px] mx-auto">
                {/* header  */}
                <div className="fixed h-16 max-w-[1400px] w-full z-20">
                    <CrossIcon className="max-xl:hidden absolute top-16 left-[0.5px] -translate-x-1/2 -translate-y-1/2" />
                    <CrossIcon className="max-xl:hidden absolute top-16 right-[0.5px] translate-x-1/2 -translate-y-1/2" />

                    {/* desktop header  */}
                    {!isMobile && (
                        <div className="max-lg:hidden grid grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_260px] h-full">
                            <div className="border-l h-full">
                                <SidebarHeader />
                            </div>
                            <div className="flex items-center border-x px-10">
                                <TopNavLinks />
                                <div className="flex-1" />
                                <HeaderIconButtons />
                            </div>
                            <div className="border-r h-full max-xl:hidden"></div>
                        </div>
                    )}

                    {/* mobile header  */}
                    {isMobile && (
                        <div className="lg:hidden h-full flex items-center gap-4 pr-5 pl-3">
                            <HamburgerMenu />
                            <TopNavLinks />
                            <div className="flex-1" />
                            <HeaderIconButtons />
                        </div>
                    )}
                </div>
                {/* header background */}
                <div className="fixed h-16 left-0 w-full border-b z-[19] bg-background"></div>

                {/* content layout */}
                <div className="min-h-screen grid lg:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_260px]">
                    <div className="h-full max-lg:hidden">
                        <div className="w-[260px] h-full fixed border-l pt-16">
                            <ModulePicker />
                            <SidebarMenu />
                        </div>
                    </div>

                    {/* main content */}
                    <div className="h-full pt-16 lg:border-x grid lg:grid-cols-[40px_1fr_40px] bg-background-secondary/80">
                        <div className="bg-[image:repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
                        <div className="lg:border-x">{children}</div>
                        <div className="bg-[image:repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
                    </div>
                    <div className="h-full py-16 max-xl:hidden">
                        <div className="w-[260px] h-full fixed border-r">{tocs}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
