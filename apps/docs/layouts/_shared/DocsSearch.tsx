import { BsSearchField } from "@workspace/ui/components/Searchfield";
import { cn } from "@workspace/ui/lib/utils";

export function DocsSearch({ className }: { className?: string }) {
  return (
    <BsSearchField
      placeholder="Search docs"
      className={cn("w-[260px] bg-transparent", className)}
    />
  );
}
