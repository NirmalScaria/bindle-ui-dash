import { Description, Heading } from "@/components/design/Texts";
import EditDocumentation from "@/components/edit-documentation/editDocumentation";
import PublishButton from "@/components/preview-components/publishButton";
import { decodeImports } from "@/lib/decodeImports";
import { parseComponent } from "@/lib/parseComponent";
import { cn } from "@/lib/utils";
import { Component, DependancyItem } from "@/models/component";
import { Sandpack } from "@codesandbox/sandpack-react";
import { getAppSS } from "firebase-nextjs/server/auth";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "700"] });



export default async function EditComponentDocumentation({ params }: { params: { componentUid: string } }) {
  const app = await getAppSS();
  const db = app.firestore();
  const componentUid = params.componentUid;
  const componentRef = db.collection('Drafts').doc(componentUid);
  var component: Component = (await componentRef.get()).data() as Component;
  component.uid = componentUid;
  const { filesToAdd, dependencies } = await parseComponent({ component });
  return <EditDocumentation component={component} filesToAdd={filesToAdd} dependancies={dependencies} />
}
