"use client";
import saveComponent from "@/actions/saveComponent";
import validateIdLib from "@/actions/validateIdLib";
import { Description, Heading } from "@/components/design/Texts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { analyseCodeOnServer } from "@/lib/analyseCode";
import { cn } from "@/lib/utils";
import validateFileLocation from "@/lib/validateFileLocation";
import validateId from "@/lib/validateId";
import validateTWConfig from "@/lib/validateTWConfig";
import validateVersions from "@/lib/validateVersions";
import { Component } from "@/models/component";
import { Loader2 } from "lucide-react";
import { Roboto_Mono } from "next/font/google";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";


const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export interface ImportVersion {
  name: string;
  version: string;
}

export default function NewComponentPage({ params }: { params: { libraryId: string } }) {
  const libraryId = params.libraryId;
  const { toast } = useToast()
  const [code, setCode] = useState("");
  const [analysing, setAnalysing] = useState(false);
  const [localImportError, setLocalImportError] = useState<String | null>(null);
  const [codeIsValid, setCodeIsValid] = useState(false);
  const [importVersions, setImportVersions] = useState<ImportVersion[]>([]);
  const [dependancyConfirmed, setDependancyConfirmed] = useState(false);
  const [configValidated, setConfigValidated] = useState(false);
  const [fileLocation, setFileLocation] = useState("");
  const [fileLocationValidated, setFileLocationValidated] = useState(false);
  const [nameValidated, setNameValidated] = useState(false);
  const [nameValidityMessage, setNameValidityMessage] = useState<string | null>(null);
  const [componentId, setComponentId] = useState("");
  const [relativeImports, setRelativeImports] = useState<string[]>([]);
  const [finalExports, setFinalExports] = useState<string[]>([]);

  const router = useRouter()

  async function analyseCode() {
    setAnalysing(true);
    const { exports, remoteImports, localImports, relativeImports: relativeImportsTemp } = await analyseCodeOnServer(code);
    setRelativeImports(relativeImportsTemp as string[]);
    if (exports.length === 0) {
      toast({
        title: "No exports found",
        description: "Please make sure you have atleast one export in your component",
      })
      setAnalysing(false);
      return;
    }
    setFinalExports(exports);
    if (localImports.length > 0) {
      setLocalImportError(`You have a relative import for ${localImports[0]}. Relative imports need some configuration.`);
      setAnalysing(false);
      return;
    }
    remoteImports.forEach(async (imp) => {
      // const res = await fetch(`https://registry.npmjs.org/${imp}`);
      // const data = await res.json();
      // const version = "^" + data["dist-tags"].latest;
      setImportVersions((prev) => [...prev, { name: imp as string, version: "*" }]);
    })
    setCodeIsValid(true);
    setAnalysing(false);
  }

  function onComponentIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    // const lowercaseValue = e.target.value.toLowerCase();
    // setValue(lowercaseValue);
    setComponentId(e.target.value.toLowerCase());
    setNameValidityMessage(null);
    setNameValidated(false);
  }

  function onCodeChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setLocalImportError(null);
    setCodeIsValid(false);
    setImportVersions([]);
    setDependancyConfirmed(false);
    setConfigValidated(false);
    setCode(e.target.value);
  }

  async function uploadComponent() {
    setAnalysing(true);
    const twConfig = (document.getElementById("additional-tailwind-config") as HTMLTextAreaElement).value;
    const twConfigString = twConfig == "" ? "{}" : twConfig;
    var configText: string;
    try {
      var configObject = eval(`(${twConfigString})`);
      configText = JSON.stringify(configObject);
    }
    catch (e) {
      toast({
        title: "Invalid Tailwind Config",
        description: "Make sure the config is a valid JSON object.",
      })
      setAnalysing(false);
      return
    }
    const component: Component = {
      id: libraryId + "." + componentId,
      content: code,
      owner: null,
      location: fileLocation,
      remoteDependancies: importVersions,
      relativeImports: relativeImports,
      exports: finalExports,
      tailwindConfig: configText,
    }
    const docId = await saveComponent({ component });
    toast({
      title: "Component saved",
      description: `Component saved successfully to drafts.`,
    })
    router.push(`/contribute/edit-draft-documentation/${docId}`);
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
    setAnalysing(true);
    const config = document.getElementById("additional-tailwind-config") as HTMLTextAreaElement;
    var configText = config.value == "" ? "{}" : config.value;
    try {
      var configObject = eval(`(${configText})`);
    }
    catch (e) {
      toast({
        title: "Invalid Tailwind Config",
        description: "Make sure the config is a valid JSON object.",
      })
      setAnalysing(false);
      return
    }
    configText = JSON.stringify(configObject);
    const errors = await validateTWConfig({ config: configText });
    if (errors.length > 0) {
      toast({
        title: "Invalid Tailwind Config",
        description: errors[0],
      })
      setAnalysing(false);
      return;
    }
    setConfigValidated(true);
    setAnalysing(false);
  }

  function onConfigChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setConfigValidated(false);
  }

  function onFileLocationChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFileLocation(e.target.value);
  }

  async function checkNameValidity() {
    setAnalysing(true);
    const errors = await validateIdLib({ id: componentId, libraryId });
    if (errors.length > 0) {
      setNameValidityMessage(errors[0]);
      setAnalysing(false);
      return;
    }
    else {
      setNameValidated(true);
      setNameValidityMessage("Id is available");
      setAnalysing(false);
    }
  }

  return <div className="flex flex-col h-full w-full items-start pt-4">
    <Heading>Create a new component</Heading>
    <Description>Add the component details below and it will be published to the library, {libraryId}</Description>
    <div className="flex flex-col w-full gap-5 mt-3 max-w-[55rem]">
      <div className="flex flex-col gap-1.5">
        <span className="text-lg  font-bold">Component Id</span>
        <div className="flex flex-row items-center">
          <div className="text-sm flex flex-col justify-center px-3 pr-1 border-r-0 rounded-r-none rounded-md bg-gray-200 h-[40px] border text-gray-600 text-nowrap whitespace-nowrap">
            {libraryId}/
          </div>
          <Input placeholder="button" value={componentId} className="bg-transparent max-w-[55rem] border rounded-l-none pl-2" onChange={onComponentIdChange} />
        </div>
        <span className="text-sm text-gray-400">This will be the unique identification name for the component. Users will use this name to install the component.</span>
        {
          nameValidityMessage && <div className="flex flex-row gap-2">
            <span className={cn("text-sm", nameValidated ? "text-green-700" : "text-red-500")}>{nameValidityMessage}</span>
          </div>
        }
        {
          !nameValidated &&
          <Button className="mt-3" disabled={analysing} onClick={checkNameValidity}>
            {analysing && <Loader2 className="w-6 h-6 mr-4 animate-spin" />}
            Check Availability
          </Button>
        }

      </div>
      {nameValidated && <div className="flex flex-col gap-1.5">
        <span className="text-lg  font-bold">Component Source Code</span>
        <Textarea rows={14} spellCheck={false} className={cn("bg-transparent max-w-[55rem] border ", robotoMono.className)} onChange={onCodeChange} placeholder={placeHolderComponent} />
        <span className="text-sm text-gray-400">This code will be copied to the users project upon installation. Try to keep imports and dependancies to minimum.</span>
        {
          localImportError && <><span className="text-red-500 text-sm">{localImportError}<br /></span>
            <span className=" text-sm">
              Read more about&nbsp;
              <Link href="/docs/relative-imports" target="_blank" className="text-blue-500 underline">
                relative imports
              </Link>
            </span>
          </>
        }
        {
          !codeIsValid &&
          <Button className="mt-3" disabled={analysing} onClick={analyseCode}>
            {analysing && <Loader2 className="w-6 h-6 mr-4 animate-spin" />}
            Analyse Source Code
          </Button>}
        {
          codeIsValid && <>
            <VersionSelection importVersions={importVersions} setDependancyConfirmed={setDependancyConfirmed} setConfigValidated={setConfigValidated} />
            {!dependancyConfirmed && <Button className="mt-3" disabled={analysing} onClick={setDependancyVersions}>
              {analysing && <Loader2 className="w-6 h-6 mr-4 animate-spin" />}
              Confirm Dependancy Versions
            </Button>}
            {dependancyConfirmed && <><div className="flex flex-col gap-1.5 mt-6">
              <span className="text-lg  font-bold">Additional Tailwind Configurations (Optional)</span>
              <span className="text-sm text-gray-400">Only add the fields that you want to add (like animations and keyframes). Leave other fields empty.</span>
              <Textarea rows={10} id="additional-tailwind-config" onChange={onConfigChange} spellCheck={false} className={cn("bg-transparent max-w-[55rem] border ", robotoMono.className)} placeholder={placeHolderConfig} />
            </div>
              {
                !configValidated &&
                <Button className="mt-3" disabled={analysing} onClick={validateConfig}>
                  {analysing && <Loader2 className="w-6 h-6 mr-4 animate-spin" />}
                  Validate Tailwind Config
                </Button>
              }
              {
                configValidated &&
                <>
                  <span className="text-lg  font-bold mt-5">File Location</span>
                  <Input placeholder="components/ui/Button.tsx" className="bg-transparent max-w-[55rem] border " onChange={onFileLocationChange} />
                  <span className="text-sm text-gray-400">The location to which the file will be copied. Must belong to either components/ or lib/ directory.</span>
                  {
                    !fileLocationValidated &&
                    <Button className="mt-3" disabled={analysing} onClick={() => {
                      setAnalysing(true);
                      validateFileLocation({ location: fileLocation }).then((errors) => {
                        if (errors.length > 0) {
                          toast({
                            title: "Invalid File Location",
                            description: errors[0],
                          })
                          setAnalysing(false);
                          return;
                        }
                        setFileLocationValidated(true);
                        setAnalysing(false);
                      }
                      )
                    }}>
                      {analysing && <Loader2 className="w-6 h-6 mr-4 animate-spin" />}
                      Validate File Location
                    </Button>
                  }
                  {
                    fileLocationValidated &&
                    <Button className="mt-3" onClick={uploadComponent} disabled={analysing}>
                      {analysing && <Loader2 className="w-6 h-6 mr-4 animate-spin" />}
                      Save and Preview
                    </Button>
                  }
                </>
              }
            </>
            }
          </>
        }
      </div>}
    </div>
  </div >
}

function VersionSelection({ importVersions, setDependancyConfirmed, setConfigValidated }
  : { importVersions: ImportVersion[], setDependancyConfirmed: (val: boolean) => void, setConfigValidated: (val: boolean) => void }) {
  return <div className="flex flex-col gap-1.5 mt-4">
    <span className="text-lg  font-bold">Specify Dependency Versions</span>
    <span className="text-sm text-gray-400">Follow the same format as specified in package.json. (ex: ^1.0.0, ~1.0.0)</span>
    <div className="flex flex-col w-full gap-1.5 mt-2">
      {importVersions.map((imp) => <span key={imp.name} className="text-md text-gray-400 flex flex-row items-center">
        <div className="w-1/2">
          {imp.name}
        </div>
        <Input onChange={() => { setDependancyConfirmed(false); setConfigValidated(false); }} id={`version-for-${imp.name}`} defaultValue={imp.version} className="bg-transparent inline max-w-[55rem] border " />
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