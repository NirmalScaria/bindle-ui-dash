import { Description, Heading, Heading3 } from "@/components/design/Texts";
import { Separator } from "@/components/ui/separator";
import { PublishedComponent } from "@/models/component";
import { getAppSS, getUserSS } from "firebase-nextjs/server/auth";
import { PlusCircle } from "lucide-react";
import type { Metadata } from 'next';
import Link from "next/link";
import { ComponentPreview } from "./libraries/[libraryId]/editLibrary";
import { Library } from "@/models/library";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Bindle-UI : A mega library of UI components for Javascript and React",
  description: "Bindle UI provides an ever growing set of UI components for Javascript and React",
};

export default async function ComponentHome() {
  const app = await getAppSS();
  const db = app.firestore();
  const user = await getUserSS();
  if (!user) {
    return { error: "User not found" };
  }
  const componentsRef = db.collection('Components').where("owner", "==", user.uid).limit(5);
  const components = (await componentsRef.get()).docs.map(doc => doc.data() as PublishedComponent);

  const librariesRef = db.collection('Libraries').where("owner", "==", user.uid).limit(5);
  const libraries = (await librariesRef.get()).docs.map(doc => doc.data() as Library);

  return <div className="flex flex-col h-full w-full items-start">
    <div className="flex flex-row gap-2 items-center justify-between w-full">
      <div className="flex flex-col gap-2 items-start">
        <div className="flex flex-col w-full gap-5 max-w-[55rem]">
          <div className="flex flex-col gap-2">
            <Heading>
              Your Libraries
            </Heading>
            <Description>
              A library is a collection of components. You can create and manage your libraries here.
            </Description>
            <Separator />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <Link href={`/contribute/new-component`} className="p-5 flex text-gray-700 hover:shadow-md transition-shadow font-medium gap-3 flex-col border justify-center rounded-md items-center min-h-[10rem]">
              <PlusCircle size={34} className="text-gray-500" />
              Create a New Library
            </Link>
            {libraries?.map(library => {
              return <LibraryPreview key={library.id} library={library} />
            })}
          </div>
        </div>
        <div className="flex flex-col w-full gap-5 mt-5 max-w-[55rem]">
          <div className="flex flex-col gap-2">
            <Heading>
              Your Components
            </Heading>
            <Description>These components belong to this library. To create independant components outside the library, <Link href="/contribute/new-component" className="underline">
              click here
            </Link>
            </Description>
            <Separator />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <Link href={`/contribute/new-component`} className="p-5 flex text-gray-700 hover:shadow-md transition-shadow font-medium gap-3 flex-col border justify-center rounded-md items-center min-h-[10rem]">
              <PlusCircle size={34} className="text-gray-500" />
              Create a New Component
            </Link>
            {components?.map(component => {
              return <ComponentPreview key={component.id} component={component} />
            })}
          </div>
        </div>

      </div>
    </div>
  </div>
}

function LibraryPreview({ library }: { library: Library }) {
  var message = "This component is in draft stage. Documentation and publishing are pending."
  if (library.status == "private") {
    message = "This component is in private stage. Users might still be able to access the published components inside it."
  }
  else {
    message = "This component is published and is available for users."
  }
  return <div
    className="p-5 flex text-gray-800 items-start font-semibold text-xl gap-2 flex-col border justify-start rounded-md min-h-[10rem]">
    <div className="flex flex-row gap-1 items-center">
      {library.id}
      <div className="flex flex-col">
        <div className="bg-green-500 text-[11px] leading-4 p-2 font-medium py-0.5 rounded-full text-white">{library.status == "public" ? "Published" : "Private"}</div>
      </div>
    </div>
    <div className="text-sm font-normal text-gray-500">
      {message}
    </div>
    <Link
      href={`/contribute/libraries/${library.id}`}
      className="w-full">
      <Button className="w-full" size="sm">
        Edit Library
      </Button>
    </Link>
  </div>
}