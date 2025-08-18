"use client";

import { CrossIcon } from "@/layouts/Docs/_components/Icons";
import { ModulePicker } from "@/layouts/Docs/_components/ModulePicker";
import { SidebarHeader } from "@/layouts/Docs/_components/SidebarHeader";
import { SidebarMenu } from "@/layouts/Docs/_components/SidebarMenu";
import { DocsSearch } from "@/layouts/_shared/DocsSearch";
import React from "react";
import { HamburgerMenu } from "./_components/HamburgerMenu";

export function DocsLayout({
  children,
  tocs,
}: {
  children: React.ReactNode;
  tocs: React.ReactNode;
}) {
  return (
    <>
      <div className="container w-full max-w-[1400px] mx-auto">
        {/* header  */}
        <div className="fixed h-16 max-w-[1400px] w-full z-20">
          <CrossIcon className="max-xl:hidden absolute top-16 left-[0.5px] -translate-x-1/2 -translate-y-1/2" />
          <CrossIcon className="max-xl:hidden absolute top-16 right-[0.5px] translate-x-1/2 -translate-y-1/2" />

          {/* desktop header  */}
          <div className="max-lg:hidden grid grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_260px] h-full">
            <div className="border-l h-full">
              <SidebarHeader />
            </div>
            <div className="flex items-center px-4 border-x">
              <DocsSearch />
            </div>
            <div className="border-r h-full max-xl:hidden"></div>
          </div>

          {/* mobile header  */}
          <div className="lg:hidden h-full flex items-center px-4">
            <HamburgerMenu />
          </div>
        </div>
        {/* header background */}
        <div className="fixed h-16 left-0 w-full border-b z-[19] bg-background"></div>

        {/* content layout */}
        <div className="min-h-screen grid lg:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_260px]">
          <div className="h-full max-lg:hidden">
            <div className="w-[260px] h-full fixed border-l pt-16">
              {/* <ModulePicker /> */}
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
  );
}
