"use server";

import { getAppSS } from "firebase-nextjs/server/auth";

export default async function saveDocumentationAction({ componentId, component, isDraft }: { componentId: string, component: any, isDraft: boolean }) {
    const app = await getAppSS();
    const db = app.firestore();
    var componentRef = db.collection(isDraft ? "Drafts" : "Components").doc(componentId);
    const response = await componentRef.set(component);
    return { success: true };
}
