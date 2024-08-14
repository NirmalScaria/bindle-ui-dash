"use server";
import { PublishedComponent } from "@/models/component";
// This only returns the information about the contributor and names of examples.

import { Contributor } from "@/models/contributor";
import { getAppSS } from "firebase-nextjs/server/auth";

export default async function getLibraryDetails({ id }: { id: string }) {
    const app = await getAppSS();
    const db = app.firestore();
    const doc = await db.collection("Libraries").doc(id).get();
    const componentsRef = db.collection("Components").where("__name__", ">=", id + '.').where("__name__", "<=", `${id}.\uf8ff`).limit(20).select("name");
    const components = (await componentsRef.get()).docs.map(doc => doc.data().name as string);
    if (!doc.exists) {
        return { error: "Component" };
    }
    var owner;
    const ownerId = doc.data()?.owner;
    const ownerDoc = await db.collection("Contributors").doc(ownerId).get();
    if (ownerDoc.exists) {
        owner = ownerDoc.data() as Contributor;
    }
    return { owner, components };
}