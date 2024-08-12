import ComponentRightBar from "@/components/component-page/componentRightbar";
import ComponentSidebar, { ComponentSidebarContent } from "@/components/component-page/componentSidebar";
import InstallComponent from "@/components/component-page/installComponent";
import CustomSandpack from "@/components/customSandpack";
import DocsFooter from "@/components/docsFooter";
import DocsTopbar from "@/components/docsTopbar";
import LocationIndicator from "@/components/locationIndicator";
import MyCode from "@/components/myCode";
import { PublishedComponent } from "@/models/component";
import { getAppSS } from "firebase-nextjs/server/auth";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bindle-UI : A mega library of UI components for Javascript and React",
  description: "Bindle UI provides an ever growing set of UI components for Javascript and React",
};

export default async function ComponentHome() {
  // merge the testComponent with the data from the database
  // give the database data priority

  return <>
    <DocsTopbar sidebarContent={<ComponentSidebarContent />} />
    <div className="sticky top-[4rem] h-[calc(100vh-4rem)]">
      <ComponentSidebar />
    </div>
    <div className="flex mt-[4rem] flex-col justify-between w-full flex-grow max-w-[60rem] lg:max-w-[min(55vw,60rem)] overflow-y-visible">
      <div className="flex flex-col w-full min-h-screen">
        <div className="flex flex-col m-5 gap-4 z-10">
          
        HIII
        </div>
        <DocsFooter />
      </div>
    </div>
    <div className="sticky top-[4rem] h-[calc(100vh-4rem)]">
      <div className="h-screen mt-7 hidden lg:flex w-[min(280px,15vw)] pr-5" />
    </div></>
}


const manualCode = `import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div>Placeholder </div>
  );
}
`

const testComponent: PublishedComponent = {
  id: "marquee",
  uid: "df",
  location: "components/ui/marquee.tsx",
  content: `import { Marquee } from "lucide-react";`,
  owner: "dfksldkfj",
  remoteDependancies: [
    {
      name: "react",
      version: "^17.0.2",
    }
  ],
  relativeImports: [],
  tailwindConfig: "",
  exports: ["Marquee"],
  status: "component",
  name: "Marquee",
  description: "An infinite scrolling component that can be used to display text, images, or videos.",
  installCommand: "auto",
  manualCode: manualCode,
  usageSampleCode: `<Marquee pauseOnHover className="[--duration:20s]">
  {firstRow.map((review) => (
    <ReviewCard key={review.username} {...review} />
  ))}
</Marquee>`,
  examples: []
}