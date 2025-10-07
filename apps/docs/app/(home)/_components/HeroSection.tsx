'use client'

import { CopyToClipboard } from '@/components/CopyToClipboard'
import { DataTableRealworld } from '@/examples/DataTableRealworld'
import { Button } from '@workspace/ui/components/Button'
import { BookIcon, ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
    return (
        <section className="container max-w-screen-xl mx-auto pt-6 pb-20">
            <div className="grid grid-cols-2 gap-4">
                <TitleAndCTA />
                <ComponentDemo />
            </div>
        </section>
    )
}

function TitleAndCTA() {
    return (
        <div className="space-y-4 py-20">
            <div className="flex">
                <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground pl-2.5 pr-1 py-1 bg-background-tertiary border rounded-md">
                    <span>npx base-stack@latest init</span>
                    <CopyToClipboard text="npx base-stack@latest init" />
                </div>
            </div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
                Build Production Apps
                <div>Faster Than Ever</div>
            </h1>
            <p className="text-lg">
                A modern React starter kit featuring a well-structured project layout, proven best practices, and all
                the essentials to help you launch your app quickly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="default" size="xl" className="w-[143px]" asChild>
                    <Link href="/docs/ui/introduction">
                        Get Started
                        <ChevronRightIcon className="size-4" />
                    </Link>
                </Button>
                <Button variant="outline" size="xl" className="w-[143px]" asChild>
                    <Link href="/docs/recipes">
                        <BookIcon />
                        Recipes
                    </Link>
                </Button>
            </div>
        </div>
    )
}

function ComponentDemo() {
    return (
        <div className="border rounded-2xl bg-background overflow-hidden w-[150%] max-w-[calc(50vw-40px)]">
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
