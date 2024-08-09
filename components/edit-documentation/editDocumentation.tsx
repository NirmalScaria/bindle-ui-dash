"use client";
import { cn } from "@/lib/utils";
import { Component, ComponentSample, PublishedComponent } from "@/models/component";
import { Sandpack, SandpackPreviewRef } from "@codesandbox/sandpack-react";
import { Description } from "@radix-ui/react-toast";
import { Roboto_Mono } from "next/font/google";
import { Heading } from "../design/Texts";
import { createRef, useRef, useState } from "react";
import ComponentPagePreview from "../preview-components/previewPage";
import { parseComponent } from "@/lib/parseComponent";
import CustomSandpack from "../customSandpack";
import CustomSandpackEditor from "../customSandpackEditor";
import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import saveDocumentationAction from "@/actions/saveDocumentation";
import { useToast } from "../ui/use-toast";
import { defaultFiles } from "@/lib/defaultExample";
import { Input } from "../ui/input";

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export default function EditDocumentation({ component, filesToAdd, dependancies }: { component: Component, filesToAdd: any, dependancies: any }) {
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const [newComponent, setNewComponent] = useState<PublishedComponent>({
        ...defaultComponent,
        ...component
    });
    // ExampleRefs should be used throughout the page.
    // Only when it is to be saved, set it to the actual component and then save.
    const [exampleRefs, setExampleRefs] = useState<{ content: { name: string, code: ComponentSample }, ref: React.RefObject<SandpackPreviewRef | undefined> }[]>(
        newComponent.examples.map((example) => {
            return {
                content: example,
                ref: createRef<SandpackPreviewRef | undefined>()
            }
        })
    )
    function getFiles() {
        const originalFiles = sandpackRef.current!.getClient()!.sandboxSetup.files
        var files: { [key: string]: string } = {}
        Object.keys(originalFiles).forEach((key) => {
            files[key] = originalFiles[key].code
        })
        return files
    }
    function syncFiles() {
        setNewComponent({ ...newComponent, mainDemo: { dependencies: dependancies, files: getFiles() } })
        setShowPreview(true);
    }
    async function uploadDocumentation() {
        setLoading(true);
        const files = getFiles();
        const componentToUpload = {
            ...newComponent,
            mainDemo: {
                dependencies: dependancies,
                files: files
            }
        }
        const res = await saveDocumentationAction({ componentId: component.uid ?? component.id, component: componentToUpload, isDraft: true });
        if (res.success) {
            toast({
                title: "Documentation saved successfully",
                description: "The documentation has been saved successfully",
            })
        } else {
            toast({
                title: "Error saving documentation",
                description: "There was an error saving the documentation. Please try again.",
            })
        }
        setLoading(false);
    }
    const sandpackRef = React.useRef<SandpackPreviewRef>();
    return <div className="flex flex-col h-full w-full items-start pt-4 gap-2">
        <div className="flex flex-row justify-between w-full">
            <Heading>Edit component documentation</Heading>
            <Button variant="secondary" onClick={uploadDocumentation} disabled={loading}>
                {loading && <Loader2 className="mr-2 animate-spin" size={16} />}
                Save Documentation
            </Button>
        </div>
        <div className="flex flex-row gap-2 w-full border-b border-white/10">
            <button onClick={() => setShowPreview(false)} className={cn("p-2", !showPreview ? "border-b-2" : "")}>Edit</button>
            <button onClick={syncFiles} className={cn("p-2", showPreview ? "border-b-2" : "")}>Preview</button>
        </div>
        {
            showPreview ? <div className="flex flex-col gap-1 w-full bg-white text-black">
                <ComponentPagePreview component={newComponent} sandpackRef={sandpackRef} />
            </div> : <div className="flex flex-col gap-3 p-4 rounded-md w-full bg-white/5 border border-white/20">
                <span className="text-base mb-2">Component id: {newComponent.id}</span>
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm">Component Name</label>
                    <input type="text" className="p-2 rounded-md bg-white/10" value={newComponent.name} onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm">Component Description. (Keep it under 20 words)</label>
                    <textarea className="p-2 rounded-md bg-white/10" value={newComponent.description} onChange={(e) => setNewComponent({ ...newComponent, description: e.target.value })} />
                </div>
                <label className="text-sm">Main demo. This will be the first thing the user see. Edit the code here to make the demo appear the way you want.</label>
                <div className="w-full max-w-[55rem]">
                    <CustomSandpackEditor
                        height="500px"
                        template="react-ts"
                        files={newComponent.mainDemo?.files ?? filesToAdd}
                        options={{
                            externalResources: ["https://cdn.tailwindcss.com"],
                        }}
                        customSetup={{
                            dependencies: dependancies
                        }}
                        sandpackRef={sandpackRef}
                    />
                </div>
                <label className="text-sm">Usage Sample Code. Give a brief idea about how to use the component after import. Do not include the whole render code. Just the component.</label>
                <textarea className="h-[150px] p-2 rounded-md bg-white/10" value={newComponent.usageSampleCode} placeholder={usageSampleCodePlaceholder} onChange={(e) => setNewComponent({ ...newComponent, usageSampleCode: e.target.value })} />
                <label className="text-sm">Example codes. Add examples that show different ways the component could be used.</label>
                <div className="flex flex-col gap-3">
                    {
                        exampleRefs.map((example, index) => {
                            return <div className="flex flex-col rounded-md p-3 border">
                                <div className="flex flex-row gap-2">
                                    Title of the example:
                                    <Input defaultValue={example.content.name} placeholder="Default" className="text-black" onChange={(e) => {
                                        const thisExample = { ...example, content: { ...example.content, name: e.target.value } }
                                        var updatedExampleRefs = [...exampleRefs];
                                        updatedExampleRefs[index] = thisExample;
                                        setExampleRefs(updatedExampleRefs)
                                    }} />
                                </div>
                            </div>
                        })
                    }
                    <Button variant="secondary" className="w-full" onClick={() => {
                        setExampleRefs([...exampleRefs, {
                            content: {
                                name: "Example Name",
                                code: {
                                    dependencies: {},
                                    files: defaultFiles
                                }
                            },
                            ref: createRef()
                        }])
                    }}>
                        Add New Example
                    </Button>
                </div>
            </div>
        }

        {/* <PublishButton componentId={componentUid} /> */}
    </div>
}

const defaultComponent: PublishedComponent = {
    id: "",
    location: "",
    content: `import {Marquee} from "lucide-react";`,
    owner: "dfksldkfj",
    remoteDependancies: [
    ],
    relativeImports: [],
    tailwindConfig: "",
    exports: [],
    status: "component",
    name: "",
    description: "",
    installCommand: "auto",
    manualCode: "",
    usageSampleCode: ``,
    examples: []
}
const usageSampleCodePlaceholder = `import {Button} from "@/components/ui/button"
        <Button variant="outline">Button</Button>
        `