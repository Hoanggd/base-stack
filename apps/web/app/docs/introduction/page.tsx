"use client";

import { Button } from "@workspace/ui/components/button";

export default function GettingStartedPage() {
  return (
    <div className="p-10 container mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Introduction</h1>
      <div>
        We use the Shadcn UI library for most of our components since it
        provides accessible, customizable building blocks for our UI. However,
        Shadcn doesn't support everything we need, so we added a few extra
        components to cover those gaps.
      </div>
      <div>
        <Button variant="link" asChild className="text-primary px-0">
          <a href="https://ui.shadcn.com/" target="_blank">
            https://ui.shadcn.com
          </a>
        </Button>
      </div>
    </div>
  );
}
