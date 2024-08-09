"use server";

import { parseComponent } from "@/lib/parseComponent";
import { Component, PublishedComponent } from "@/models/component";
import { getAppSS, getUserSS } from "firebase-nextjs/server/auth";

export default async function saveComponent({ component }: { component: Component }) {
    var newComponent: Required<Component> & Partial<PublishedComponent> = component as any;
    const user = await getUserSS();
    const app = await getAppSS();
    const db = app.firestore();
    const { filesToAdd } = await parseComponent({ component });
    const manualCode = filesToAdd[newComponent.location];
    newComponent.manualCode = manualCode;
    newComponent.owner = user?.uid ?? null;
    newComponent.status = component.status ?? "component";
    const response = await db.collection("Drafts").add(newComponent);
    const docId = response.id;
    return docId;
}