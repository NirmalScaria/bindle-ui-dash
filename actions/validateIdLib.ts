'use server';
import { getAppSS, getUserSS } from "firebase-nextjs/server/auth";

export default async function validateIdLib({ id, libraryId }: { id: string, libraryId: string }) {
    // id can contain alphanumeric characters, hyphens, and underscores
    const app = await getAppSS();
    const db = app.firestore();
    const user = await getUserSS();
    const errors: string[] = [];
    if (id.length < 2) {
        errors.push("ID must be at least 2 characters long");
    }
    else if (id.length > 50) {
        errors.push("ID must be at most 50 characters long");
    }
    else if (!/^[a-z0-9_-]+$/.test(id)) {
        errors.push("ID can only contain alphanumeric characters, hyphens, and underscores");
    }
    // check if document with id already exists
    const doc = await db.collection("Components").doc(libraryId + "." + id).get();
    const libDoc = await db.collection("Libraries").doc(libraryId).get();
    if (doc.exists) {
        errors.push("A component with same id already exists.");
    }
    if (!libDoc.exists) {
        errors.push("A requested library doesn't exist.");
    }
    if (libDoc?.data()?.owner !== user?.uid) {
        errors.push("You don't have permission to edit this library.");
    }
    return errors;
}
