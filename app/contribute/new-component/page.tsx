"use client";
import { Description, Heading } from "@/components/design/Texts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { analyseCodeOnServer } from "@/lib/analyseCode";
import { cn } from "@/lib/utils";
import validateVersions from "@/lib/validateVersions";
import { Loader2 } from "lucide-react";
import { Roboto_Mono } from "next/font/google";
import Link from "next/link";
import React, { useState } from "react";


const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export interface ImportVersion {
  name: string;
  version: string;
}

export default function NewComponentPage() {
  const { toast } = useToast()
  const [code, setCode] = useState("");
  const [analysing, setAnalysing] = useState(false);
  const [localImportError, setLocalImportError] = useState<String | null>(null);
  const [codeIsValid, setCodeIsValid] = useState(false);
  const [importVersions, setImportVersions] = useState<ImportVersion[]>([]);
  const [dependancyConfirmed, setDependancyConfirmed] = useState(false);
  const [configValidated, setConfigValidated] = useState(false);

  async function analyseCode() {
    setAnalysing(true);
    const { exports, remoteImports, localImports } = await analyseCodeOnServer(code);
    console.log("Exports : ", exports)
    console.log("Remote Imports : ", remoteImports)
    console.log("Local Imports : ", localImports)
    if (exports.length === 0) {
      toast({
        title: "No exports found",
        description: "Please make sure you have atleast one export in your component",
      })
      setAnalysing(false);
      return;
    }
    if (localImports.length > 0) {
      setLocalImportError(`You have a relative import for ${localImports[0]}. Relative imports need some configuration.`);
      setAnalysing(false);
      return;
    }
    remoteImports.forEach(async (imp) => {
      const res = await fetch(`https://registry.npmjs.org/${imp}`);
      const data = await res.json();
      const version = data["dist-tags"].latest;
      setImportVersions((prev) => [...prev, { name: imp as string, version }]);
    })
    setCodeIsValid(true);
    setAnalysing(false);
  }

  function onCodeChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setLocalImportError(null);
    setCodeIsValid(false);
    setImportVersions([]);
    setDependancyConfirmed(false);
    setCode(e.target.value);
  }

  async function setDependancyVersions() {
    setAnalysing(true);
    const versions = importVersions.map((imp) => {
      const input = document.getElementById(`version-for-${imp.name}`) as HTMLInputElement;
      return { name: imp.name, version: input.value };
    })
    const errors = await validateVersions({ versions });
    if (errors.length > 0) {
      toast({
        title: "Invalid versions",
        description: errors[0],
      })
      setAnalysing(false);
      return;
    }
    setDependancyConfirmed(true);
    setAnalysing(false);
  }

  async function validateConfig() {
    const config = document.getElementById("additional-tailwind-config") as HTMLTextAreaElement;
    const configText = config.value;
    
  }

  return <div className="flex flex-col h-full w-full items-start pt-4">
    <Heading>Create a new component</Heading>
    <Description>Add the component details below and it will be published to bindle-ui. Users will be able to directly install and use it.</Description>
    <div className="flex flex-col w-full gap-5 mt-3 max-w-[55rem]">
      <div className="flex flex-col gap-1.5">
        <span className="text-lg text-white font-bold">Component Id</span>
        <Input placeholder="button" className="bg-transparent max-w-[55rem] border border-white/30" />
        <span className="text-sm text-gray-400">This will be the unique identification name for the component. Users will use this name to install the component.</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-lg text-white font-bold">Component Source Code</span>
        <Textarea rows={14} spellCheck={false} className={cn("bg-transparent max-w-[55rem] border border-white/30", robotoMono.className)} onChange={onCodeChange} placeholder={placeHolderComponent} />
        <span className="text-sm text-gray-400">This code will be copied to the users project upon installation. Try to keep imports and dependancies to minimum.</span>
        {
          localImportError && <><span className="text-red-500 text-sm">{localImportError}<br /></span>
            <span className="text-white text-sm">
              Read more about&nbsp;
              <Link href="/docs/relative-imports" target="_blank" className="text-blue-500 underline">
                relative imports
              </Link>
            </span>
          </>
        }
        {
          !codeIsValid &&
          <Button variant="secondary" className="mt-3" disabled={analysing} onClick={analyseCode}>
            {analysing && <Loader2 className="w-6 h-6 mr-4 animate-spin" />}
            Analyse Source Code
          </Button>}
        {
          codeIsValid && <>
            <VersionSelection importVersions={importVersions} setDependancyConfirmed={setDependancyConfirmed} />
            {!dependancyConfirmed && <Button variant="secondary" className="mt-3" disabled={analysing} onClick={setDependancyVersions}>
              {analysing && <Loader2 className="w-6 h-6 mr-4 animate-spin" />}
              Confirm Dependancy Versions
            </Button>}
            {dependancyConfirmed && <><div className="flex flex-col gap-1.5 mt-6">
              <span className="text-lg text-white font-bold">Additional Tailwind Configurations (Optional)</span>
              <span className="text-sm text-gray-400">Only add the fields that you want to add (like animations and keyframes). Leave other fields empty.</span>
              <Textarea rows={10} id="additional-tailwind-config" spellCheck={false} className={cn("bg-transparent max-w-[55rem] border border-white/30", robotoMono.className)} onChange={onCodeChange} placeholder={placeHolderConfig} />
            </div>
              {
                !configValidated &&
                <Button variant="secondary" className="mt-3" disabled={analysing} onClick={validateConfig}>
                  Validate Tailwind Config
                </Button>
              }
            </>
            }
          </>
        }
      </div>
    </div>
  </div >
}

function VersionSelection({ importVersions, setDependancyConfirmed }: { importVersions: ImportVersion[], setDependancyConfirmed: (val: boolean) => void }) {
  return <div className="flex flex-col gap-1.5 mt-4">
    <span className="text-lg text-white font-bold">Specify Dependency Versions</span>
    <span className="text-sm text-gray-400">Follow the same format as specified in package.json. (ex: ^1.0.0, ~1.0.0)</span>
    <div className="flex flex-col w-full gap-1.5 mt-2">
      {importVersions.map((imp) => <span key={imp.name} className="text-md text-gray-400 flex flex-row items-center">
        <div className="w-1/2">
          {imp.name}
        </div>
        <Input onChange={() => { setDependancyConfirmed(false) }} id={`version-for-${imp.name}`} defaultValue={imp.version} className="bg-transparent inline max-w-[55rem] border border-white/30" />
      </span>)}
    </div>
  </div>
}

const placeHolderConfig = `{
theme: {
  extend: {
    keyframes: {
      "border-beam": {
        "100%": {
          "offset-distance": "100%",
        },
      },
    },
    animation: {
      "border-beam": "border-beam 1s infinite",
    },
  },
},`

const placeHolderComponent = `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
`