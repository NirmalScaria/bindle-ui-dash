"use server";

import { PublishedComponent } from "@/models/component";
import { getAppSS, getUserSS } from "firebase-nextjs/server/auth";

export default async function saveDocumentationAction({ componentId, component, isDraft }: { componentId: string, component: PublishedComponent, isDraft: boolean }) {
    const app = await getAppSS();
    const db = app.firestore();
    const user = await getUserSS();
    var componentRef = db.collection(isDraft ? "Drafts" : "Components").doc(componentId);
    const currentComponent = (await componentRef.get()).data();
    if (currentComponent === undefined) {
        return { error: "Component not found" };
    }
    if (currentComponent.owner !== user?.uid) {
        return { error: "You are not the owner of this component" };
    }
    if (component.name.length < 2) {
        return { error: "Name is too short" };
    }
    if (component.name.length > 30) {
        return { error: "Name is too long" };
    }
    if (component.description.length < 4) {
        return { error: "Description is too short" };
    }
    if (component.description.length > 120) {
        return { error: "Description is too long" };
    }
    component.status = "documentation";
    const response = await componentRef.set(component);
    return { success: true };
}
