import { CopyToClipboard } from "@/components/CopyToClipboard";
import { readExampleFile } from "@/lib/composition";
import { highlightCode } from "@/lib/highlight-code";
import { ScrollArea } from "@workspace/ui/components/ScrollArea";
import { cn } from "@workspace/ui/lib/utils";
import dynamic from "next/dynamic";

export type ComponentPreviewProps = {
  name: string;
  className?: string;
};

export async function ComponentPreview({
  name,
  className,
}: ComponentPreviewProps) {
  // get code string from component
  const code = await readExampleFile(name);
  const out = await highlightCode(code);

  return (
    <div className="border-b p-5! lg:p-10! pt-0! lg:pt-0! w-full">
      <div className="p-1.5 space-y-1.5 border rounded-lg bg-background">
        <div
          className={cn(
            "py-10 not-prose flex items-center justify-center px-5",
            className,
          )}
        >
          <Preview name={name} />
        </div>

        <div className="relative border rounded-sm overflow-hidden ">
          <CopyToClipboard
            text={code}
            className="absolute right-2 top-2 z-[1]"
          />
          <div className="">
            <ScrollArea className="grid">
              <div
                dangerouslySetInnerHTML={{ __html: out }}
                className="max-h-[400px] [&>pre]:my-0 [&>pre]:rounded-none"
              ></div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Preview({ name }: { name: string }) {
  const Component = dynamic(() =>
    import(`../examples/${name}`).then((res) => {
      const comp = res[name];

      if (!comp) {
        throw new Error(`Component "${name}" not found in module`);
      }

      return comp;
    }),
  );

  return <Component />;
}
