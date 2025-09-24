import { PROJECT_NAME } from "@/constants/common";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

export function Logo({
  className,
  showName = true,
}: {
  className?: string;
  showName?: boolean;
}) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 w-fit", className)}>
      <img src="/logo.png" alt="Logo" className="w-7 h-7" />
      {showName && <span className="font-semibold">{PROJECT_NAME}</span>}
    </Link>
  );
}
