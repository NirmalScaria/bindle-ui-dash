"use server";

import { Component } from "@/models/component";
import { getUserSS, getAppSS } from "firebase-nextjs/server/auth";

export default async function saveComponent({ component }: { component: Component }) {
    const user = await getUserSS();
    const app = await getAppSS();
    const db = app.firestore();
    component.owner = user?.uid ?? null;
    const response = await db.collection("Drafts").add(component);
    const docId = response.id;
    return docId;
}