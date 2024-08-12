"use client";

import { PublishedComponent } from "@/models/component";
import InstallComponent from "../component-page/installComponent";
import CustomSandpack from "../customSandpack";
import MyCode from "../myCode";

export default function ComponentPagePreview({ component, sandpackRef }: { component: PublishedComponent, sandpackRef: any }) {
    return <div className="flex flex-col m-5 gap-4 max-w-[50rem]">
        {/* <LocationIndicator /> */}
        <h1 className="text-4xl font-bold">{component.name}</h1>
        <p className="text-lg text-gray-500">{component.description}</p>
        <CustomSandpack component={component} />
        <h2 className="text-3xl font-bold mt-4">Installation</h2>
        <hr />
        <InstallComponent component={component} />
        <h2 className="text-3xl font-bold mt-4">Usage</h2>
        <hr />
        {component.usageSampleCode && <div className="flex flex-col max-h-[300px]">
            <MyCode code={component.usageSampleCode} showLineNumbers={false} />
        </div>}
        {component.examples != undefined && component.examples.length != 0 && <> <h2 className="text-3xl font-bold mt-4">Examples</h2>
            <hr />
            {
                component.examples.map((example, index) => {
                    return <div key={index} className="flex flex-col gap-4">
                        <h3 className="text-2xl font-bold">{example.name}</h3>
                        <CustomSandpack files={example.code.files} />
                    </div>
                })
            }
        </>
        }
    </div>
}