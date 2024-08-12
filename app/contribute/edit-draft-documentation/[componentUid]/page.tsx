import EditDocumentation from "@/components/edit-documentation/editDocumentation";
import { parseComponent } from "@/lib/parseComponent";
import { Component } from "@/models/component";
import { getAppSS } from "firebase-nextjs/server/auth";

export default async function EditComponentDocumentation({ params, searchParams }: { params: { componentUid: string }, searchParams: URLSearchParams }) {
  const app = await getAppSS();
  const db = app.firestore();
  const componentUid = params.componentUid;
  // @ts-ignore
  var componentRef = db.collection('Drafts').doc(componentUid);
  var component: Component = (await componentRef.get()).data() as Component;
  component.uid = componentUid;
  const { filesToAdd, dependencies } = await parseComponent({ component });
  return <EditDocumentation component={component} filesToAdd={filesToAdd} dependancies={dependencies} />
}
