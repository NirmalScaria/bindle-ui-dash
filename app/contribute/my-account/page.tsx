export const dynamic = "force-dynamic";
import { Description, Heading, Heading3 } from "@/components/design/Texts";
import ProfileEditor from "./profileEditor";
import { getAppSS, getUserSS } from "firebase-nextjs/server/auth";
import { Contributor } from "@/models/contributor";

export default async function MyAccountPage() {
    const app = await getAppSS();
    const db = app.firestore();
    const user = await getUserSS();
    const userDoc = await db.collection("Contributors").doc(user!.uid).get();
    var currentUser: Contributor = {
        displayName: "",
        id: "",
        uid: user!.uid
    }
    if (userDoc.exists) {
        currentUser = userDoc.data() as Contributor;
    }
    return <div className="flex flex-row w-full justify-start">
        <div className="flex flex-col h-full gap-7 w-full items-start pt-4 max-w-[60rem]">
            <div className="flex flex-col w-full">
                <Heading>Edit Profile</Heading>
                <Description>
                    The details given in this page will be shown as the creator details to the users. If empty, the users will not see the creator details.
                </Description>
            </div>
            <ProfileEditor currentUser={currentUser} />
        </div>
    </div>
}