"use client";

import {
  PhasorFormIcon,
  PhasorTemplateIcon,
  PhasorUiIcon,
} from "@/layouts/Docs/_components/Icons";
import {
  Popover,
  PopoverDialog,
  PopoverTrigger,
} from "@workspace/ui/components/Popover";
import { Button } from "@workspace/ui/components/Button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export enum ModuleValue {
  UI = "ui",
  Form = "form",
  Template = "template",
}

type Module = {
  value: ModuleValue;
  label: string;
  icon: React.ReactNode;
  description: string;
};

const modules: Module[] = [
  {
    value: ModuleValue.UI,
    label: "phasor/ui",
    icon: <PhasorUiIcon />,
    description: "Re-usable components",
  },
  {
    value: ModuleValue.Form,
    label: "phasor/form",
    icon: <PhasorFormIcon />,
    description: "Manage form state",
  },
  {
    value: ModuleValue.Template,
    label: "phasor/template",
    icon: <PhasorTemplateIcon />,
    description: "Official Phasor templates",
  },
];

export function ModulePicker() {
  const selectedModule = useModulePicker();

  return (
    <div className="p-2 py-2 z-[2] relative">
      <PopoverTrigger>
        <Button
          variant="unstyled"
          className="text-start w-full rounded-lg transition-colors flex items-center gap-3 p-1.5 hover:bg-neutral-100 data-[state=open]:bg-neutral-100"
        >
          <ModuleItem module={selectedModule} />
          <ChevronDown className="ml-auto w-4 h-4 text-neutral-500" />
        </Button>
        <Popover>
          <PopoverDialog className="w-[242px] p-2">
            <div className="flex flex-col gap-1">
              {modules.map((item) => (
                <Link
                  href={`/${item.value}`}
                  className="text-start w-full rounded-md flex items-center gap-3 p-1.5 hover:bg-neutral-400/10"
                >
                  <ModuleItem module={item} />
                </Link>
              ))}
            </div>
          </PopoverDialog>
        </Popover>
      </PopoverTrigger>
    </div>
  );
}

function ModuleItem({ module }: { module: Module }) {
  return (
    <>
      <div className="grid place-items-center w-10 h-10 rounded-lg bg-neutral-50">
        {module.icon}
      </div>
      <div>
        <p className="text-sm font-semibold">{module.label}</p>
        <p className="text-xs text-neutral-500 whitespace-nowrap">
          {module.description}
        </p>
      </div>
    </>
  );
}

export function useModulePicker() {
  const pathname = usePathname();
  const selectedModule =
    modules.find((item) => pathname.startsWith(`/${item.value}`)) || modules[0];

  return selectedModule;
}
