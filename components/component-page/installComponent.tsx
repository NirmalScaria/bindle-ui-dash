"use client";

import { cn } from "@/lib/utils";
import { PublishedComponent } from "@/models/component";
import { useState } from "react";
import MyCode from "../myCode";

export default function InstallComponent({ component }: { component: PublishedComponent }) {
    const [isCLI, setIsCLI] = useState(true);
    const [manualCodeExpanded, setManualCodeExpanded] = useState(false);

    const installCommand = component.installCommand == "auto" ? "npx bindle-ui add " + component.id : component.installCommand
    var remoteDependanciesCommand = ""
    var tailwindContent = ""
    if (component.remoteDependancies && component.remoteDependancies.length > 0) {
        remoteDependanciesCommand = "npm install "
        component.remoteDependancies.forEach(dep => {
            remoteDependanciesCommand += dep.name + "@" + dep.version.replaceAll('^', '').replaceAll('~', '') + " "
        })
    }
    if (component.tailwindConfig && component.tailwindConfig != "") {
        tailwindContent = JSON.stringify(JSON.parse(component.tailwindConfig), null, 2)
    }
    var manualSteps: any = [
        {
            "text": "Copy and paste the following code into your project.",
            "code": component.manualCode
        }
    ]

    if (remoteDependanciesCommand != "") {
        manualSteps.push({
            "text": "Install the dependancies running the command.",
            "code": remoteDependanciesCommand
        })
    }
    if (tailwindContent != "") {
        manualSteps.push({
            "text": "Add the following code to your tailwind.config.js file.",
            "code": tailwindContent
        })
    }
    manualSteps.push({
        "text": "Update the import paths to match the component location.",
    })

    return <div className="flex flex-col w-full">
        <div className="flex flex-row mb-5 border-b">
            <button onClick={() => setIsCLI(true)} className={cn("p-2 text-sm", !isCLI ? "" : "border-b-2 border-b-black")}>CLI</button>
            <button onClick={() => setIsCLI(false)} className={cn("p-2 text-sm", isCLI ? "" : "border-b-2 border-b-black")}>Manual</button>
        </div>
        <div className={cn("flex-col gap-2", isCLI ? "flex" : "hidden")}>
            <MyCode code={installCommand} showLineNumbers={false} />
        </div>
        <div className={cn("flex-col gap-6 border-l ml-5 pl-10", !isCLI ? "flex" : "hidden")}>
            {manualSteps.map((step: any, i: any) => {
                return <div key={i} className="flex flex-col gap-4">
                    <div className="flex flex-row items-center gap-3 -left-[3.75rem] relative">
                        <div className="rounded-full bg-gray-100 border-4 border-white h-10 w-10 flex flex-row items-center justify-center font-semibold">{i + 1}</div>
                        <p className="font-semibold">{step.text}</p>
                    </div>
                    {step.code && <div className="flex flex-col max-h-[300px]">
                        <MyCode code={step.code} showLineNumbers={false} />
                    </div>}
                </div>
            })}
        </div>
    </div>
}