"use client";
import { cn } from "@/lib/utils";
import {
    SandpackProvider,
    SandpackLayout,
    SandpackPreview,
    SandpackCodeEditor
} from "@codesandbox/sandpack-react";
import { useState } from "react";


export default function CustomSandpack() {
    const [showCode, setShowCode] = useState(false);

    return <div className="flex flex-col w-full">
        <div className="flex flex-row mb-5 border-b">
            <button onClick={() => setShowCode(false)} className={cn("p-2 text-sm", showCode ? "" : "border-b-2 border-b-black")}>Preview</button>
            <button onClick={() => setShowCode(true)} className={cn("p-2 text-sm", !showCode ? "" : "border-b-2 border-b-black")}>Code</button>
        </div>
        <SandpackProvider template="vanilla" theme="auto">
            <SandpackLayout style={{ display: showCode ? "none" : "block" }}>
                <SandpackPreview />
            </SandpackLayout>
            <SandpackLayout style={{ display: showCode ? "block" : "none" }}>
                <SandpackCodeEditor />
            </SandpackLayout>
        </SandpackProvider>
    </div>
}