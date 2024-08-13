import EditDocumentation from "@/components/edit-documentation/editDocumentation";
import { parseComponent } from "@/lib/parseComponent";
import { Component, PublishedComponent } from "@/models/component";
import { Library } from "@/models/library";
import { getAppSS } from "firebase-nextjs/server/auth";
import EditLibrary from "./editLibrary";

export default async function EditComponentDocumentation({ params, searchParams }: { params: { libraryId: string }, searchParams: URLSearchParams }) {
  const app = await getAppSS();
  const db = app.firestore();
  const libraryUid = params.libraryId;
  // @ts-ignore
  var libraryRef = db.collection('Libraries').doc(libraryUid);
  var library: Library = (await libraryRef.get()).data() as Library;
  if (!library || !library.id) {
    return <div>Library not found</div>
  }
  const componentsRef = db.collection('Components').where("__name__", ">=", `${library.id}.`).where("__name__", "<=", `${library.id}.\uf8ff`);
  const components = (await componentsRef.get()).docs.map(doc => doc.data() as PublishedComponent);
  library.components = components
  const draftsRef = db.collection('Drafts').where("id", ">=", `${library.id}.`).where("id", "<=", `${library.id}.\uf8ff`);
  const drafts = (await draftsRef.get()).docs.map(doc => {
    const component = doc.data() as Component;
    component.uid = doc.id;
    return component;
  });
  library.drafts = drafts
  return <EditLibrary library={library} />
}
