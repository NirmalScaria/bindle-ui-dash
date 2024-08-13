"use server";

import { getAppSS, getUserSS } from "firebase-nextjs/server/auth";

export default async function publishLibraryAction({libraryId}: {libraryId: string}) {
    const app = await getAppSS();
    const db = app.firestore();
    const user = await getUserSS();
    if (!user) {
        return {error: "User not logged in"};
    }
    const libraryRef = db.collection("Libraries").doc(libraryId);
    const library = (await libraryRef.get()).data();
    if (!library) {
        return {error: "Library not found"};
    }
    if (library.owner !== user?.uid) {
        return {error: "User not authorized"};
    }
    if (library.status === "public") {
        return {error: "Library already published"};
    }
    await libraryRef.update({status: "public"});
    return {success: true};
}