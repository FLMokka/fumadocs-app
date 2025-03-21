"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";

const packageManagers = [
  { name: "npm", command: "npx" },
  { name: "yarn", command: "npx" },
  { name: "pnpm", command: "pnpm dlx" },
  { name: "bun", command: "bunx --bun" },
];

const APP_URL = "https://againui.com";

export default function ComponentInstall({ name }: { name: string }) {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedPM, setSelectedPM] = useState(packageManagers[0]);
  const componentURL = `${APP_URL}/r/${name}.json`;

  const currentCommand = useMemo(() => `${selectedPM.command} shadcn@latest add ${componentURL}`, [selectedPM, componentURL]);

  const copyCommand = (pm: typeof packageManagers[0]) => {
    setSelectedPM(pm);
    navigator.clipboard.writeText(`${pm.command} shadcn@latest add ${componentURL}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CodeBlock lang="bash" allowCopy={false}>
      <Pre>{currentCommand}</Pre>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7"
            title={copied ? "Copied!" : "Copy to clipboard"}
          >
            {copied ?
              <Check className="h-4 w-4" />
              :
              <Copy className="h-4 w-4" />
            }
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {packageManagers.map((pm) => (
            <DropdownMenuItem
              key={pm.name}
              onClick={() => copyCommand(pm)}
              className="flex items-center justify-between"
            >
              <span>{pm.name}</span>
              {pm.name === selectedPM.name && <Check className="h-3.5 w-3.5 ml-2" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </CodeBlock>
  );
}