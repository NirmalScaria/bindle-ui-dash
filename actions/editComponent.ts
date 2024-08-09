"use server";

import { parseComponent } from "@/lib/parseComponent";
import { Component, PublishedComponent } from "@/models/component";
import { getAppSS, getUserSS } from "firebase-nextjs/server/auth";

export default async function editComponent({ component }: { component: Component }) {
    var newComponent: Required<Component> & Partial<PublishedComponent> = component as any;
    const user = await getUserSS();
    const app = await getAppSS();
    const db = app.firestore();
    var currentRef = db.collection('Components').doc(component.id);
    if(component.status != "published") {
        currentRef = db.collection("Drafts").doc(component.uid!);
    }
    const { filesToAdd } = await parseComponent({ component });
    const manualCode = filesToAdd[newComponent.location];
    newComponent.manualCode = manualCode;
    newComponent.owner = user?.uid ?? null;
    newComponent.status = component.status ?? "component";
    const response = await currentRef.set(newComponent, {merge: true});
    return { success : true }
}