"use client";
import { cn } from "@/lib/utils";
import { Component, PublishedComponent } from "@/models/component";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Description } from "@radix-ui/react-toast";
import { Roboto_Mono } from "next/font/google";
import { Heading } from "../design/Texts";
import { useState } from "react";
import ComponentPagePreview from "../preview-components/previewPage";

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export default function EditDocumentation({ component }: { component: Component }) {
    const [showPreview, setShowPreview] = useState(false);
    const [newComponent, setNewComponent] = useState<PublishedComponent>({
        ...defaultComponent,
        ...component
    });
    return <div className="flex flex-col h-full w-full items-start pt-4 gap-2">
        <Heading>Edit component documentation</Heading>
        <div className="flex flex-row gap-2 w-full border-b border-white/10">
            <button onClick={() => setShowPreview(false)} className={cn("p-2", !showPreview ? "border-b-2" : "")}>Edit</button>
            <button onClick={() => setShowPreview(true)} className={cn("p-2", showPreview ? "border-b-2" : "")}>Preview</button>
        </div>
        {
            showPreview ? <div className="flex flex-col gap-1 w-full bg-white text-black">
                <ComponentPagePreview component={newComponent} />
            </div> : <div className="flex flex-col gap-1 p-4 rounded-md w-full bg-white/5 border border-white/20">
                <label className="text-sm">Component Name</label>
                <input type="text" className="p-2 rounded-md bg-white/10" value={newComponent.name} onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })} />
                <label className="text-sm">Component Description. (Keep it under 20 words)</label>
                <textarea className="p-2 rounded-md bg-white/10" value={newComponent.description} onChange={(e) => setNewComponent({ ...newComponent, description: e.target.value })} />
            </div>
        }
        <div className="w-full mt-4">
            {/* <Sandpack
        template="react-ts"
        files={filesToAdd}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
        customSetup={{
          dependencies: dependencies
        }}
      /> */}
        </div>
        {/* <PublishButton componentId={componentUid} /> */}
    </div>
}

const defaultComponent: PublishedComponent = {
    id: "",
    location: "",
    content: `import { Marquee } from "lucide-react";`,
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
    examples: {
    }
}