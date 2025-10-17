'use client'

import { CopyToClipboard } from '@/shared/components/CopyToClipboard'
import { DataTableRealworld } from '@/shared/components/examples/DataTableRealworld'
import { Button } from '@workspace/ui/components/Button'
import { ChevronRightIcon, Layers2Icon } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
    return (
        <section className="px-3">
            <div className="px-3 border-x py-5 container max-w-screen-xl mx-auto md:pb-14 md:px-8">
                <div className="relative grid gap-10 xl:grid-cols-2 xl:gap-4">
                    <TitleAndCTA />
                    <ComponentDemo />
                </div>
            </div>
        </section>
    )
}

function TitleAndCTA() {
    return (
        <div className="space-y-5 py-0 md:py-5 xl:py-20">
            <div className="flex justify-center sm:justify-start">
                <div className="flex items-center gap-1 font-mono text-xs pl-2.5 pr-0.5 py-0.5 text-muted-foreground bg-white/60 border rounded-md dark:bg-background-secondary/70">
                    <span>$ npx base-stack@latest init</span>
                    <CopyToClipboard text="npx base-stack@latest init" />
                </div>
            </div>
            <div>
                <h1 className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground sm:text-5xl sm:text-left">
                    The Foundation for Modern React Apps
                </h1>
                <p className="text-center text-base sm:text-lg mt-1 sm:text-left">
                    A modern React starter kit with best practices and all the essentials to quickly launch your
                    frontend.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:w-[328px]">
                <Button variant="default" size="xl" asChild>
                    <Link href="/docs/guide/introduction">
                        Get Started
                        <ChevronRightIcon className="size-4" />
                    </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                    <Link href="/docs/ui">
                        <Layers2Icon />
                        Components
                    </Link>
                </Button>
            </div>
        </div>
    )
}

function ComponentDemo() {
    return (
        <div className="border rounded-2xl bg-background/85 overflow-hidden xl:w-[160%] xl:max-w-[calc(50vw-40px)]">
            <div className="flex justify-center px-4 py-2 items-center relative">
                <div className="flex items-center space-x-2 absolute left-4 top-4">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#13A10E]" />
                </div>
                <div className="text-xs bg-background-tertiary/70 text-muted-foreground rounded-sm px-10 py-1.5">
                    http://localhost:9009
                </div>
            </div>
            <div className="px-5 pb-5 pt-2">
                <DataTableRealworld />
            </div>
        </div>
    )
}
