"use client";
import createLibraryAction from "@/actions/createLibrary";
import saveComponent from "@/actions/saveComponent";
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

export default function NewLibraryPage() {
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
  const [libraryId, setLibraryId] = useState("");
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
    setLibraryId(e.target.value.toLowerCase());
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

  async function createLibrary() {
    setAnalysing(true);

    const resp = await createLibraryAction({ libraryId: libraryId });
    if (resp.error) {
      toast({
        title: "Error",
        description: resp.error,
      })
      setAnalysing(false);
      return;
    }
    toast({
      title: "Component saved",
      description: `Component saved successfully to drafts.`,
    })
    router.push(`/contribute/edit-library/${libraryId}`);
  }




  async function checkNameValidity() {
    setAnalysing(true);
    const errors = await validateId({ id: libraryId });
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
    <Heading>Create a new library</Heading>
    <Description>You can create a library and then create components in it.</Description>
    <div className="flex flex-col w-full gap-5 mt-3 max-w-[55rem]">
      <div className="flex flex-col gap-1.5">
        <span className="text-lg  font-bold">Library Id</span>
        <Input placeholder="button" value={libraryId} className="bg-transparent max-w-[55rem] border" onChange={onComponentIdChange} />
        <span className="text-sm text-gray-400">This will be the unique identification name for the library. Users will use this name to access the library.</span>
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

      {
        nameValidated &&
        <Button className="mt-3" onClick={createLibrary} disabled={analysing}>
          {analysing && <Loader2 className="w-6 h-6 mr-4 animate-spin" />}
          Create Library
        </Button>
      }

    </div>
  </div>
}


