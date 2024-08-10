"use server";

import { Contributor } from "@/models/contributor";
import { getAppSS } from "firebase-nextjs/server/auth";

export default async function getContributor({ id }: { id: string }) {
    const app = await getAppSS();
    const db = app.firestore();
    const doc = await db.collection("Contributors").doc(id).get();
    if (!doc.exists) {
        return { error: "User not found" };
    }
    return doc.data() as Contributor;
}