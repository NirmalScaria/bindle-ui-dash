"use client";

import { cn } from "@/lib/utils";
import { PublishedComponent } from "@/models/component";
import { Roboto_Mono } from "next/font/google";
import { useState } from "react";
import MyCode from "../myCode";

export default function InstallComponent({ component }: { component: PublishedComponent }) {
    const [isCLI, setIsCLI] = useState(true);

    const installCommand = component.installCommand == "auto" ? "npx bindle-ui add " + component.id : component.installCommand

    return <div className="flex flex-col w-full">
        <div className="flex flex-row mb-5 border-b">
            <button onClick={() => setIsCLI(true)} className={cn("p-2 text-sm", !isCLI ? "" : "border-b-2 border-b-black")}>CLI</button>
            <button onClick={() => setIsCLI(false)} className={cn("p-2 text-sm", isCLI ? "" : "border-b-2 border-b-black")}>Manual</button>
        </div>
        <div className={cn("flex-col gap-2", isCLI ? "flex" : "hidden")}>
            <MyCode code={installCommand} showLineNumbers={false} />
        </div>
    </div>
}