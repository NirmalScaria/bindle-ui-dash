"use server";

import { Library } from "@/models/library";
import { getAppSS, getUserSS } from "firebase-nextjs/server/auth";

export default async function saveLibraryAction({library}: {library : Library}) {
    const app = await getAppSS();
    const db = app.firestore();
    const user = await getUserSS();
    if(!user) {
        return {error: "User not found"};
    }
    const libraryRef = db.collection("Libraries").doc(library.id);
    const currentLibrary = (await libraryRef.get()).data() as Library;
    if(!currentLibrary) {
        return {error: "Library not found"};
    }
    if(currentLibrary.owner != user.uid) {
        return {error: "User does not own this library"};
    }
    if(library.name == undefined) {
        return {error: "Library name is required"};
    }
    if(library.description == undefined) {
        return {error: "Library description is required"};
    }
    if(library.name.length < 3) {
        return {error: "Library name must be at least 3 characters"};
    }
    if(library.description.length < 3) {
        return {error: "Library description must be at least 3 characters"};
    }
    if(library.name.length > 50) {
        return {error: "Library name must be less than 50 characters"};
    }
    if(library.description.length > 200) {
        return {error: "Library description must be less than 200 characters"};
    }
    await libraryRef.update(library);
    return {success: true}
}