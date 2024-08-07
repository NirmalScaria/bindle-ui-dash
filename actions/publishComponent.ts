"use server";

import { Component } from "@/models/component";
import { getAppSS, getUserSS } from "firebase-nextjs/server/auth";

export default async function publishComponentAction({ componentId }: { componentId: string }) {
    const user = await getUserSS();
    const app = await getAppSS();
    const db = app.firestore();
    var draft = db.collection("Drafts").doc(componentId);
    const draftContent = (await draft.get()).data() as Component;
    if (draftContent.owner !== user?.uid) {
        return { error: "You are not the owner of this component" };
    }
    const response = await db.collection("Components").doc(draftContent.id).set(draftContent);
    await draft.delete();
    return { success: true };
}