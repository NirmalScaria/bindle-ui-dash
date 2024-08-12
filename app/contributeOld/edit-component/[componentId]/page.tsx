import { Component } from "@/models/component";
import { getAppSS } from "firebase-nextjs/server/auth";
import EditComponent from "./editComponent";

export default async function Page({ params, searchParams }: { params: { componentId: string }, searchParams: URLSearchParams }) {
    const app = await getAppSS();
    const db = app.firestore();
    const componentUid = params.componentId;
    // @ts-ignore
    const isPublished: string = searchParams["published"];
    var componentRef = db.collection('Drafts').doc(componentUid);
    if (isPublished == "true") {
        componentRef = db.collection('Components').doc(componentUid);
    }
    var component: Component = (await componentRef.get()).data() as Component;
    component.uid = componentUid;
    return (
        <EditComponent component={component} />
    );
}

