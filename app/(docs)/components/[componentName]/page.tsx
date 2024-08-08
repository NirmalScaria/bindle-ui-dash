import CustomSandpack from "@/components/customSandpack";
import LocationIndicator from "@/components/locationIndicator";
import { PublishedComponent } from "@/models/component";


const testComponent: PublishedComponent = {
    id: "1",
    location: "components/ui/marquee.tsx",
    content: `import { Marquee } from "lucide-react";`,
    owner: "dfksldkfj",
    remoteDependancies: [],
    relativeImports: [],
    tailwindConfig: "",
    exports: ["Marquee"],
    status: "component",
    name: "Marquee",
    description: "An infinite scrolling component that can be used to display text, images, or videos.",
}

export default async function ComponentHome({ params }: { params: { componentName: string } }) {
    const component = testComponent;
    return <div className="flex flex-col m-5 gap-3 max-w-[50rem]">
        <LocationIndicator />
        <h1 className="text-4xl font-bold">{component.name}</h1>
        <p className="text-lg text-gray-500">{component.description}</p>
        <CustomSandpack />
    </div>
}