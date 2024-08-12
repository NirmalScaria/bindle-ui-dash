import EditDocumentation from "@/components/edit-documentation/editDocumentation";
import { parseComponent } from "@/lib/parseComponent";
import { Component } from "@/models/component";
import { Library } from "@/models/library";
import { getAppSS } from "firebase-nextjs/server/auth";
import EditLibrary from "./editLibrary";

export default async function EditComponentDocumentation({ params, searchParams }: { params: { libraryId: string }, searchParams: URLSearchParams }) {
  const app = await getAppSS();
  const db = app.firestore();
  const componentUid = params.libraryId;
  // @ts-ignore
  var libraryRef = db.collection('Libraries').doc(componentUid);
  var library: Library = (await libraryRef.get()).data() as Library;
  return <EditLibrary library={library} />
}
