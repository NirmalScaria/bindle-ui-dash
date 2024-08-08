import { Description, Heading, Heading2 } from "@/components/design/Texts";
import { Button } from "@/components/ui/button";
import { Component } from "@/models/component";
import { getAppSS, getUserSS } from "firebase-nextjs/server/auth";
import { Check, X } from "lucide-react";
import Link from "next/link";
export default async function MyComponentsPage() {
    const app = await getAppSS();
    const user = await getUserSS();
    const db = app.firestore();
    const drafts = (await db.collection('Drafts').where('owner', '==', user?.uid).get()).docs.map(doc => {
        const data = doc.data();
        return {
            ...data,
            uid: doc.id
        }
    });
    const components = (await db.collection('Components').where('owner', '==', user?.uid).get()).docs.map(doc => {
        const data = doc.data();
        return {
            ...data,
            uid: doc.id
        }
    });
    return <div className="flex flex-col h-full w-full items-start pt-4">
        <Heading>My Components</Heading>
        <Description>This page lists the components you have published, and components that are in your drafts.</Description>
        <Heading2>Drafts</Heading2>
        {
            drafts.map(draft => <DraftItem draft={draft as Component} />)
        }
        <div className="mt-4">
            <Heading2>Published Components</Heading2>
        </div>
        {
            components.map(component => <ComponentItem component={component as Component} />)
        }
    </div>
}

function DraftItem({ draft }: { draft: Component }) {
    var componentStatus = false;
    var documentationStatus = false;
    var publishedStatus = false;
    if (draft.status == "component") {
        componentStatus = true;
    }
    if (draft.status == "documentation") {
        componentStatus = true;
        documentationStatus = true;
    }
    if (draft.status == "published") {
        componentStatus = true;
        documentationStatus = true;
        publishedStatus = true;
    }
    return <div className="flex flex-col p-3 border rounded-md my-2 w-full gap-2">
        <div className="font-bold flex flex-row">
            {draft.id}
        </div>
        <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
                <div className="flex flex-row border rounded-md p-1 px-2">
                    Component
                    {
                        componentStatus ? <Check className="text-green-500" /> : <X className="text-red-500" />
                    }
                </div>
                <div className="flex flex-row border rounded-md p-1 px-2">
                    Documentation
                    {
                        documentationStatus ? <Check className="text-green-500" /> : <X className="text-red-500" />
                    }
                </div>
                <div className="flex flex-row border rounded-md p-1 px-2">
                    Published
                    {
                        publishedStatus ? <Check className="text-green-500" /> : <X className="text-red-500" />
                    }
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <Link href={`/contribute/edit-component/${draft.uid}`}><Button variant="secondary" size="sm">Edit Component</Button></Link>
                <Link href={`/contribute/edit-component-documentation/${draft.uid}`}><Button variant="secondary" size="sm">Edit Documentation</Button></Link>
                <Link href={`/contribute/edit-component-documentation/${draft.uid}`}><Button variant="secondary" size="sm">Publish</Button></Link>
            </div>
        </div>
    </div>
}

function ComponentItem({ component }: { component: Component }) {
    return <div className="flex flex-col p-3 border rounded-md my-2 w-full">
        <div className="font-bold">{component.id}</div>
    </div>
}