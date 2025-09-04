"use client";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { RouterProvider } from "react-aria-components";
import { Toaster as SonnerToaster } from "sonner";
import { Toaster } from "@workspace/ui/components/sonner";
import { I18nProvider as ReactAriaI18nProvider } from "react-aria-components";

dayjs.extend(isoWeek);

declare module "react-aria-components" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  let router = useRouter();

  return (
    <RouterProvider navigate={router.push}>
      <ReactAriaI18nProvider locale="en-GB">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          enableColorScheme
        >
          {children}
          <SonnerToaster />
          <Toaster />
        </ThemeProvider>
      </ReactAriaI18nProvider>
    </RouterProvider>
  );
}
