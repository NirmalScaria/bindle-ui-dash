import ComponentRightBar from "@/components/component-page/componentRightbar";
import ComponentRightBarCS from "@/components/component-page/componentRightbarCS";
import ComponentSidebar, { ComponentSidebarContent } from "@/components/component-page/componentSidebar";
import InstallComponent from "@/components/component-page/installComponent";
import CustomSandpack from "@/components/customSandpack";
import { Description, Heading3 } from "@/components/design/Texts";
import DocsFooter from "@/components/docsFooter";
import DocsTopbar from "@/components/docsTopbar";
import LocationIndicator from "@/components/locationIndicator";
import MyCode from "@/components/myCode";
import { PublishedComponent } from "@/models/component";
import { Library } from "@/models/library";
import { getAppSS } from "firebase-nextjs/server/auth";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bindle-UI : A mega library of UI components for Javascript and React",
  description: "Bindle UI provides an ever growing set of UI components for Javascript and React",
};

export default async function ComponentHome({ params }: { params: { libraryName: string } }) {
  const app = await getAppSS();
  const db = app.firestore();
  const ref = db.collection("Libraries").doc(params.libraryName);
  const doc = await ref.get();
  const componentsRef = db.collection("Components")
    .where("__name__", ">=", params.libraryName + '.')
    .where("__name__", "<=", `${params.libraryName}.\uf8ff`)
    .limit(20);
  const components = (await componentsRef.get()).docs.map(doc => doc.data() as PublishedComponent);

  const library: Library = doc.data() as Library;

  if (doc.data() == undefined) {
    return <>
      <DocsTopbar sidebarContent={<ComponentSidebarContent />} />
      <div className="sticky top-[4rem] h-[calc(100vh-4rem)]">
        <ComponentSidebar />
      </div>
      <div className="flex mt-[4rem] flex-col justify-between w-full flex-grow max-w-[60rem] lg:max-w-[min(55vw,60rem)] overflow-y-visible">
        <div className="flex flex-col w-full min-h-screen">
          <div className="flex flex-col m-5 gap-4 z-10 min-h-screen">
            <LocationIndicator />

            <div className="flex flex-col h-[50vh] justify-center items-center text-center w-full">
              <h1 className="text-4xl font-bold">Library Not Found</h1>
              <p className="text-lg text-gray-500">The Library you are looking for does not exist.</p>
            </div>
            <div></div>
          </div>
          <DocsFooter />
        </div>
      </div>
      <div className="sticky top-[4rem] h-[calc(100vh-4rem)]">
        <ComponentRightBarCS />
      </div></>
  }
  metadata.title = `${library.name} | Bindle-UI`
  metadata.description = library.description
  return <div className="flex flex-col m-5 gap-2 z-10">
    <LocationIndicator />
    <h1 className="text-4xl font-bold" id="introduction">{library.name}</h1>
    <p className="text-lg text-gray-500">{library.description}</p>
    <hr />
    <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
      {components.map((component) => (
        <div className="flex flex-col my-3">
          <Heading3>{component.name}</Heading3>
          <Description className="mt-4">{component.description}</Description>
          <CustomSandpack component={component} />
          <hr/>
        </div>
      ))}
    </div>
    <hr />
  </div>

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
  examples: [],
  installCount: 0
}