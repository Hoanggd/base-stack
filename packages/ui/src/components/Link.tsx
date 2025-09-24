"use client";

import { type VariantProps } from "class-variance-authority";
import {
  Link as AriaLink,
  LinkProps as AriaLinkProps,
  composeRenderProps,
} from "react-aria-components";
import { cn } from "@workspace/ui/lib/utils";
import { buttonVariants } from "./Button";

interface LinkProps
  extends AriaLinkProps,
    VariantProps<typeof buttonVariants> {}

const Link = ({ className, variant = "link", size, ...props }: LinkProps) => {
  return (
    <AriaLink
      className={composeRenderProps(className, (className) =>
        cn(
          variant &&
            buttonVariants({
              variant,
              size,
              className,
            }),
        ),
      )}
      {...props}
    />
  );
};

export { Link };
export type { LinkProps };
