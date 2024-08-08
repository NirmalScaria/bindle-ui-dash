"use client";
import { cn } from "@/lib/utils";
import {
    SandpackProvider,
    SandpackLayout,
    SandpackPreview,
    SandpackCodeEditor,
    SandpackFileExplorer
} from "@codesandbox/sandpack-react";
import { useState } from "react";
import { githubLight } from "@codesandbox/sandpack-themes";


export default function CustomSandpackEditor({ ...props }) {
    const [showCode, setShowCode] = useState(false);

    return <div className="flex flex-col w-full">
        <div className="flex flex-row mb-5 border-b">
            <button onClick={() => setShowCode(false)} className={cn("p-2 text-sm", showCode ? "" : "border-b-2 border-b-white")}>Preview</button>
            <button onClick={() => setShowCode(true)} className={cn("p-2 text-sm", !showCode ? "" : "border-b-2 border-b-white")}>Code</button>
        </div>
        <SandpackProvider template="vanilla" theme={githubLight} {...props}>
            <SandpackLayout style={{ visibility: !showCode ? "visible" : "hidden", height: !showCode ? "auto" : "1px" }}>
                <SandpackPreview />
            </SandpackLayout>
            <SandpackLayout style={{ visibility: showCode ? "visible" : "hidden", height: showCode ? "auto" : "1px" }}>
                <SandpackFileExplorer />
                <SandpackCodeEditor />
            </SandpackLayout>
        </SandpackProvider>
    </div>
}