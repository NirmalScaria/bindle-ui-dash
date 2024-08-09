import InstallComponent from "@/components/component-page/installComponent";
import CustomSandpack from "@/components/customSandpack";
import LocationIndicator from "@/components/locationIndicator";
import MyCode from "@/components/myCode";
import { PublishedComponent } from "@/models/component";
import { getAppSS } from "firebase-nextjs/server/auth";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bindle-UI : A mega library of UI components for Javascript and React",
  description: "Bindle UI provides an ever growing set of UI components for Javascript and React",
};

export default async function ComponentHome({ params }: { params: { componentName: string } }) {
  const app = await getAppSS();
  const db = app.firestore();
  const ref = db.collection("Components").doc(params.componentName);
  const doc = await ref.get();
  // merge the testComponent with the data from the database
  // give the database data priority

  const component = {
    ...testComponent,
    ...doc.data()
  }
  if (doc.data() == undefined) {
    return <div className="flex flex-col m-5 gap-4 h-full justify-between max-w-[50rem]">
      <LocationIndicator />
      <div className="flex flex-col justify-center items-center text-center w-full">
        <h1 className="text-4xl font-bold">Component Not Found</h1>
        <p className="text-lg text-gray-500">The component you are looking for does not exist.</p>
      </div>
      <div></div>
    </div>
  }
  metadata.title = `${component.name} | Bindle-UI`
  metadata.description = component.description
  return <div className="flex flex-col m-5 gap-4 max-w-[50rem] z-10">
    <LocationIndicator />
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