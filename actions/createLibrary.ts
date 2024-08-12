"use server";

import validateId from "@/lib/validateId";
import { getAppSS, getUserSS } from "firebase-nextjs/server/auth";

export default async function createLibraryAction({ libraryId }: { libraryId: string }) {
    if (!validateId({ id: libraryId })) {
        return { success: false, error: "Invalid library id" };
    }
    try {
        const app = await getAppSS();
        const user = await getUserSS();
        const db = app.firestore();
        const response = await db.collection("Libraries").doc(libraryId).set({
            owner: user?.uid ?? null,
            id: libraryId,
            status: "private"
        });
        return { success: true };
    } catch (e) {
        return { success: false, error: "Some thing went wrong in creating the library." };
    }
}