"use server";

import { Contributor } from "@/models/contributor";
import { getAppSS, getUserSS } from "firebase-nextjs/server/auth";

export default async function editUser({ user }: { user: Contributor }) {
    const app = await getAppSS();
    const db = app.firestore();
    const loggedInUser = await getUserSS();
    if (loggedInUser === null) {
        return { error: "User not logged in" };
    }
    if (loggedInUser.uid !== user.uid) {
        return { error: "User not authorized" };
    }
    if (user.displayName.length < 2) {
        return { error: "Display name is too short" };
    }
    if (user.displayName.length > 30) {
        return { error: "Display name is too long" };
    }
    if (user.id.length < 2) {
        return { error: "User id is too short" };
    }
    if (user.id.length > 30) {
        return { error: "User id is too long" };
    }
    if (user.id[0] !== "@") {
        return { error: "User id must start with @" };
    }
    // check if another user with same id exists
    const userDoc = await db.collection("Contributors").where("id", "==", user.id).get();
    if (userDoc.docs.length > 0 && userDoc.docs[0].id !== user.uid) {
        return { error: "Username already exists" };
    }
    const response = await db.collection("Contributors").doc(user.uid).set(user);
    return { success: true };
}