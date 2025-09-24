import { ComponentPreview } from "@/components/ComponentPreview";
import { Button } from "@workspace/ui/components/Button";
import { cn } from "@workspace/ui/lib/utils";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { MdxSnippet } from "./MdxSnippet";

type MdxProps = {
  code: string;
};

const components = {
  ComponentPreview,
  Button,
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    let lang = "";

    try {
      lang = (children as any).props.className?.split("language-")[1];
    } catch (error) {
      lang = "bash";
    }

    return (
      <MdxSnippet lang={lang} {...props}>
        {children}
      </MdxSnippet>
    );
  },
  blockquote: ({ ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote style={{ quotes: "none" }} {...props} />
  ),
};

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx [&>*]:px-5 lg:[&>*]:px-10">
      <Component components={components} />
    </div>
  );
}
