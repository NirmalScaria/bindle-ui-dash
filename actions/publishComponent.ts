"use server";

import { PublishedComponent } from "@/models/component";
import { getAppSS, getUserSS } from "firebase-nextjs/server/auth";

export default async function publishComponentAction({ componentId }: { componentId: string }) {
    const user = await getUserSS();
    const app = await getAppSS();
    const db = app.firestore();
    var draft = db.collection("Drafts").doc(componentId);
    const draftContent = (await draft.get()).data();
    if (draftContent === undefined) {
        return { error: "Component not found" };
    }
    if (draftContent.status !== "documentation") {
        return { error: "Please finish documentation before publishgin" };
    }
    if (draftContent.owner !== user?.uid) {
        return { error: "You are not the owner of this component" };
    }
    const component = draftContent as PublishedComponent;
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
    draftContent.status = "published";
    const response = await db.collection("Components").doc(draftContent.id).set(draftContent);
    await draft.delete();
    return { success: true };
}