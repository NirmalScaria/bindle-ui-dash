"use server";
// This only returns the information about the contributor and names of examples.

import { Contributor } from "@/models/contributor";
import { getAppSS } from "firebase-nextjs/server/auth";

export default async function getComponentDetails({ id }: { id: string }) {
    const app = await getAppSS();
    const db = app.firestore();
    const doc = await db.collection("Components").doc(id).get();
    if (!doc.exists) {
        return { error: "Component" };
    }
    var owner;
    const ownerId = doc.data()?.owner;
    const ownerDoc = await db.collection("Contributors").doc(ownerId).get();
    if (ownerDoc.exists) {
        owner = ownerDoc.data() as Contributor;
    }
    const examples = doc.data()?.examples.map((example: any) => example.name);
    return { owner, examples };
}