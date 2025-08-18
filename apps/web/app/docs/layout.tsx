'use client'

import { DocsSidebar } from "@/app/docs/_components/docs-sidebar";
import { Separator } from "@workspace/ui/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <DocsSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div className="text-sm capitalize">{pathname.split("/").pop()?.replace("-", " ")}</div>
        </header>
        <div>
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
