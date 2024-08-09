import EditDocumentation from "@/components/edit-documentation/editDocumentation";
import { parseComponent } from "@/lib/parseComponent";
import { Component } from "@/models/component";
import { getAppSS } from "firebase-nextjs/server/auth";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "700"] });



export default async function EditComponentDocumentation({ params, searchParams }: { params: { componentUid: string }, searchParams: URLSearchParams }) {
  const app = await getAppSS();
  const db = app.firestore();
  const componentUid = params.componentUid;
  console.log(searchParams)
  // @ts-ignore
  const isPublished: string = searchParams["published"];
  var componentRef = db.collection('Drafts').doc(componentUid);
  if (isPublished == "true") {
    componentRef = db.collection('Components').doc(componentUid);
  }
  var component: Component = (await componentRef.get()).data() as Component;
  component.uid = componentUid;
  const { filesToAdd, dependencies } = await parseComponent({ component });
  return <EditDocumentation component={component} filesToAdd={filesToAdd} dependancies={dependencies} />
}
