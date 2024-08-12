import { Description, Heading, Heading2, Heading3 } from "@/components/design/Texts";
import EditDocumentation from "@/components/edit-documentation/editDocumentation";
import { parseComponent } from "@/lib/parseComponent";
import { Component } from "@/models/component";
import { getAppSS } from "firebase-nextjs/server/auth";
import { Roboto_Mono } from "next/font/google";
import { Badge } from "@/components/ui/badge"
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";


const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "700"] });



export default async function EditComponentDocumentation({ params, searchParams }: { params: { componentUid: string }, searchParams: URLSearchParams }) {
    const app = await getAppSS();
    const db = app.firestore();
    const componentUid = params.componentUid;
    // @ts-ignore
    const componentRef = db.collection('Drafts').doc(componentUid);
    var component: Component = (await componentRef.get()).data() as Component;
    component.uid = componentUid;
    const { filesToAdd, dependencies } = await parseComponent({ component });
    return <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2 items-center">
            <Heading>{component.id}</Heading>
            <div className="flex flex-col">
                <Badge className="bg-yellow-700">Draft</Badge>
            </div>
        </div>
        <Description>This component has been published, and users can install and use it in their projects.</Description>
        <Link className="underline flex flex-row gap-1 items-center" href={`/components/${component.id}`} target="_blank">
            <ExternalLink size={16} strokeWidth={2} />
            View Component Page
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <Link href={`/contribute/edit-draft/${component.uid}`} className="p-5 gap-2 pt-10 flex flex-col border rounded-md hover:shadow-md transition-all">
                <Heading3>Edit Component</Heading3>
                <Description>Make changes to the component's metadata and files.</Description>
            </Link>
            <Link href={`/contribute/edit-draft-documentation/${component.uid}`} className="p-5 gap-2 pt-10 flex flex-col border rounded-md hover:shadow-md transition-all">
                <Heading3>Edit Documentation</Heading3>
                <Description>Make changes to the Component documentation page.</Description>
            </Link>
            <Link href={`/contribute/edit-draft-documentation/${component.uid}`} className="p-5 gap-2 pt-10 flex flex-col border rounded-md hover:shadow-md transition-all">
                <Heading3>Publish Component</Heading3>
                <Description>Review the component documentation and publish the component.</Description>
            </Link>
        </div>
    </div>
}
