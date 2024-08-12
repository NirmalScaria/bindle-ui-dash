"use client";
import { cn } from "@/lib/utils";
import {
    SandpackCodeEditor,
    SandpackFileExplorer,
    SandpackLayout,
    SandpackPreview,
    SandpackProvider
} from "@codesandbox/sandpack-react";
import { githubLight } from "@codesandbox/sandpack-themes";
import { useState } from "react";


export default function CustomSandpack({ ...props }) {
    const [showCode, setShowCode] = useState(false);
    return <div className="flex flex-col w-full">
        <div className="flex flex-row mb-5 border-b">
            <button onClick={() => setShowCode(false)} className={cn("p-2 text-sm", showCode ? "" : "border-b-2 border-b-black")}>Preview</button>
            <button onClick={() => setShowCode(true)} className={cn("p-2 text-sm", !showCode ? "" : "border-b-2 border-b-black")}>Code</button>
        </div>
        <SandpackProvider template="react-ts" theme={githubLight} {...props} files={props.files ?? props.component.mainDemo?.files ?? {}} options={{
            externalResources: ["https://cdn.tailwindcss.com"],
            initMode: "user-visible",
            initModeObserverOptions: {
                rootMargin: "1000px 0px"
            }
        }}>
            <SandpackLayout style={{ visibility: !showCode ? "visible" : "hidden", height: !showCode ? "auto" : "1px" }}>
                <SandpackPreview style={{ height: "450px" }} />
            </SandpackLayout>
            <SandpackLayout style={{ visibility: showCode ? "visible" : "hidden", height: showCode ? "auto" : "1px" }}>
                <SandpackFileExplorer style={{ height: "450px" }} />
                <SandpackCodeEditor style={{ height: "450px" }} readOnly={true} />
            </SandpackLayout>
        </SandpackProvider>
    </div>
}