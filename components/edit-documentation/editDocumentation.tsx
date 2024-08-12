"use client";
import publishComponentAction from "@/actions/publishComponent";
import saveDocumentationAction from "@/actions/saveDocumentation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Component, ComponentSample, PublishedComponent } from "@/models/component";
import { SandpackPreviewRef } from "@codesandbox/sandpack-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { Roboto_Mono } from "next/font/google";
import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import CustomSandpackEditor from "../customSandpackEditor";
import { Heading } from "../design/Texts";
import ComponentPagePreview from "../preview-components/previewPage";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";


const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export default function EditDocumentation({ component, filesToAdd, dependancies }: { component: Component, filesToAdd: any, dependancies: any }) {
    const [showPreview, setShowPreview] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const { toast } = useToast();
    const [newComponent, setNewComponent] = useState<PublishedComponent>({
        ...defaultComponent,
        ...component
    });
    const sandpackContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // This will run once after the component is mounted
        if (sandpackContainerRef.current) {
            sandpackContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    // -1 means creating new. Any other number means editting that index.
    const [edittingIndex, setEdittingIndex] = useState<number | null>(null);
    const [edittingExample, setEdittingExample] = useState<{ code: ComponentSample, ref: React.RefObject<SandpackPreviewRef | undefined> } | null>(null);
    const [edittingExampleName, setEdittingExampleName] = useState("");
    // Add new example button stays visible if not already editting or creating an example.
    // When creating an example, the editor opens up, and a save button appears.
    // When saving, it saves to exampleRefs and closes the editor.
    // When editing, the editor opens up with the content of the example, and a save button appears.
    // When saving, it saves to exampleRefs and closes the editor.
    function saveExample() {
        // This saves the actively editting example to the exampleRefs
        // Does not save to the newComponent or database.
        const originalFiles = edittingExample!.ref.current!.getClient()!.sandboxSetup.files
        var files: { [key: string]: string } = {}
        Object.keys(originalFiles).forEach((key) => {
            files[key] = originalFiles[key].code
        })
        if (edittingIndex === -1) {
            setExampleRefs([...exampleRefs, {
                content: {
                    name: edittingExampleName,
                    code: {
                        dependencies: dependancies,
                        files: files
                    }
                },
                ref: edittingExample!.ref
            }])
        } else {
            var updatedExampleRefs = [...exampleRefs];
            updatedExampleRefs[edittingIndex!] = {
                content: {
                    name: edittingExampleName,
                    code: {
                        dependencies: dependancies,
                        files: files
                    }
                },
                ref: edittingExample!.ref
            }
            setExampleRefs(updatedExampleRefs)
        }
        setEdittingIndex(null)
    }
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
    function getExamples() {
        var res: { name: string, code: ComponentSample }[] = []
        exampleRefs.forEach((example) => {
            res.push({
                name: example.content.name,
                code: {
                    dependencies: example.content.code.dependencies,
                    files: example.content.code.files
                }
            })
        })
        return res;
    }

    function syncFiles() {
        setNewComponent({ ...newComponent, mainDemo: { dependencies: dependancies, files: getFiles() }, examples: getExamples() })
        setShowPreview(true);
    }
    async function uploadDocumentation() {
        setSaving(true);
        const files = getFiles();
        const componentToUpload = {
            ...newComponent,
            mainDemo: {
                dependencies: dependancies,
                files: files
            },
            examples: getExamples()
        }
        const res = await saveDocumentationAction({ componentId: component.uid ?? component.id, component: componentToUpload, isDraft: component.status != "published" });
        if (res.success) {
            toast({
                title: "Documentation saved successfully",
                description: "The documentation has been saved successfully",
            })
        } else {
            toast({
                title: "Error saving documentation",
                description: res.error,
            })
            setSaving(false);
            return false;
        }
        setSaving(false);
    }
    async function publishComponent() {
        setPublishing(true);
        const res = await publishComponentAction({ componentId: component.uid ?? component.id });
        if (res.success) {
            toast({
                title: "Component published successfully",
                description: "The component has been published successfully",
            })
        } else {
            toast({
                title: "Error publishing component",
                description: res.error,
            })
            setPublishing(false);
        }
        setPublishing(false);
    }
    const sandpackRef = React.useRef<SandpackPreviewRef>();
    const MemoizedSandpackEditor = useMemo(() => (
        <CustomSandpackEditor
            height="500px"
            template="react-ts"
            files={edittingExample?.code.files}
            options={{
                externalResources: ["https://cdn.tailwindcss.com"],
            }}
            customSetup={{
                dependencies: dependancies
            }}
            sandpackRef={edittingExample?.ref}
        />
    ), [edittingExample]);

    const MemoizedMainEditor = useMemo(() => (
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
    ), [newComponent.mainDemo]);
    return <div className="flex flex-col h-full w-full items-start pt-4 gap-2">
        <div className="flex flex-row justify-between w-full">
            <Heading>Edit documentation</Heading>
            <div className="flex flex-row gap-2">
                {newComponent.status != "published" && <Button variant="secondary" onClick={publishComponent} disabled={saving || publishing || showPreview}>
                    {publishing && <Loader2 className="mr-2 animate-spin" size={16} />}
                    Publish
                </Button>}
                <Button onClick={uploadDocumentation} disabled={saving || publishing || showPreview}>
                    {saving && <Loader2 className="mr-2 animate-spin" size={16} />}
                    Save Documentation
                </Button>
            </div>
        </div>
        <div className="flex flex-row gap-2 w-full border-b border-black/10">
            <button onClick={() => {
                setShowPreview(false);
                setTimeout(() => {
                    if (sandpackContainerRef.current) {
                        sandpackContainerRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 0);
            }} className={cn("p-2 border-black", !showPreview ? "border-b-2" : "")}>Edit</button>
            <button onClick={syncFiles} className={cn("p-2 border-black", showPreview ? "border-b-2" : "")}>Preview</button>
        </div>
        {
            showPreview ? <div className="flex flex-col gap-1 w-full">
                <ComponentPagePreview component={newComponent} sandpackRef={sandpackRef} />
            </div> : <div className="flex flex-col gap-3 p-4 rounded-md w-full border border-black/20  max-w-[55rem]">
                <span className="text-base mb-2">Component id: {newComponent.id}</span>
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm">Component Name</label>
                    <Input type="text" value={newComponent.name} onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm">Component Description. (Keep it under 20 words)</label>
                    <Textarea value={newComponent.description} onChange={(e) => setNewComponent({ ...newComponent, description: e.target.value })} />
                </div>
                <label className="text-sm">Main demo. This will be the first thing the user see. Edit the code here to make the demo appear the way you want.</label>
                <div className="w-full max-w-[55rem]" ref={sandpackContainerRef}>
                    {MemoizedMainEditor}
                </div>
                <label className="text-sm">Usage Sample Code. Give a brief idea about how to use the component after import. Do not include the whole render code. Just the component.</label>
                <Textarea className="h-[150px]" value={newComponent.usageSampleCode} placeholder={usageSampleCodePlaceholder} onChange={(e) => setNewComponent({ ...newComponent, usageSampleCode: e.target.value })} />
                <label className="text-sm">Example codes. Add examples that show different ways the component could be used.</label>
                <div className="flex flex-col gap-3">
                    {
                        exampleRefs.map((example, index) => {
                            return <div className="flex flex-row w-full justify-between rounded-md p-3 border">
                                {example.content.name}
                                <div className="flex flex-row gap-2">

                                    <Dialog>
                                        <DialogTrigger><Button variant="destructive">Delete</Button></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-white">Are you sure?</DialogTitle>
                                                <DialogDescription>
                                                    This will delete the example permanently. The component code is unaffected.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose>
                                                    <Button variant="outline" className="text-white">Cancel</Button>
                                                </DialogClose>
                                                <Button variant="destructive" onClick={() => {
                                                    setExampleRefs(exampleRefs.filter((_, i) => i != index))
                                                }}>Delete</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <Button variant="secondary" onClick={() => {
                                        setEdittingExample({
                                            code: example.content.code,
                                            ref: example.ref
                                        })
                                        setEdittingExampleName(example.content.name)
                                        setEdittingIndex(index)
                                    }}>Edit</Button>
                                </div>
                            </div>
                        })
                    }
                    {
                        edittingIndex != null && <div className="flex flex-col gap-3 max-w-[55rem]">
                            <div className="flex flex-row gap-2">
                                Example title:
                                <Input defaultValue={edittingExampleName} placeholder="Default" className="text-white" onChange={(e) => {
                                    setEdittingExampleName(e.target.value)
                                }} />
                            </div>
                            {MemoizedSandpackEditor}
                            <Button variant="secondary" onClick={() => {
                                saveExample()
                            }}>Save Example</Button>
                        </div>
                    }
                    {
                        edittingIndex === null && <Button variant="secondary" onClick={() => {
                            setEdittingExample({
                                code: {
                                    dependencies: dependancies,
                                    files: filesToAdd
                                },
                                ref: createRef<SandpackPreviewRef | undefined>()
                            })
                            setEdittingIndex(-1)
                        }}>Add new example</Button>
                    }
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