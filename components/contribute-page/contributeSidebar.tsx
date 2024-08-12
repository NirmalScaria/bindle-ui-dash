"use server";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getAppSS, getUserSS } from "firebase-nextjs/server/auth";
import { Plus } from "lucide-react";
import Link from "next/link";
import SidebarLink from "./sidebarLink";

export default async function ContributeSidebar({ className }: { className?: string }) {
    return <div className={cn("flex flex-col z-10", className)}>
        <div className={"h-screen w-[250px] lg:w-[min(280px,15vw)] flex-col gap-2 pt-2 px-4 hidden lg:flex justify-between"}>
            <div className="flex flex-col gap-2 my-4 mx-6">
                <ContributeSidebarContent />
            </div>
        </div>
    </div>
}

export async function ContributeSidebarContent() {
    const app = await getAppSS();
    const db = app.firestore();
    const user = await getUserSS();
    const ref = db.collection("Components").where('owner', '==', user?.uid).limit(20).select('id', 'name');
    const librariesRef = db.collection("Libraries").where('owner', '==', user?.uid).limit(20).select('id', 'name');
    const draftsRef = db.collection("Drafts").where('owner', '==', user?.uid).limit(20).select('id', 'name');
    const componentsSnapshot = await ref.get();
    const myComponents = componentsSnapshot.docs.map(doc => doc.data());
    const librariesSnapshot = await librariesRef.get();
    const myLibraries = librariesSnapshot.docs.map(doc => doc.data());
    const draftsSnapshot = await draftsRef.get();
    const myDrafts = draftsSnapshot.docs.map(doc => doc.data());
    return <ScrollArea className="h-screen">
        <div className="flex flex-col gap-3  pb-[7rem]">
            <div className="flex flex-col">
                <span className="font-semibold text-sm mb-3">
                    Getting Started
                </span>
                <SidebarLink name="Introduction" href="/components" />
                <SidebarLink name="Installation" href="/components/installation" />
                <SidebarLink name="CLI" href="/components/cli" />
            </div>
            <div className="flex flex-col">
                <span className="font-semibold text-sm mb-3">
                    My Components
                </span>
                <Link href="/contribute/new-component" className={cn("text-[0.9rem] py-[0.2rem]  hover:underline", "text-black/50")}>
                    <div className="flex flex-row gap-1 items-center">
                        <Plus size={12} strokeWidth={3} />
                        New Component
                    </div>
                </Link>
                {myComponents.map((component) =>
                    <SidebarLink key={component.id} name={component.name ?? component.id} href={`/components/${component.id}`} />
                )}
            </div>
            <div className="flex flex-col">
                <span className="font-semibold text-sm mb-3">
                    My Libraries
                </span>
                <Link href="/contribute/new-library" className={cn("text-[0.9rem] py-[0.2rem]  hover:underline", "text-black/50")}>
                    <div className="flex flex-row gap-1 items-center">
                        <Plus size={12} strokeWidth={3} />
                        New Library
                    </div>
                </Link>
                {myLibraries.map((library) =>
                    <SidebarLink key={library.id} name={library.name ?? library.id} href={`/components/${library.id}`} />
                )}
            </div>
            {
                myDrafts.length > 0 && <div className="flex flex-col">
                    <span className="font-semibold text-sm mb-3">
                        My Drafts
                    </span>
                    {myDrafts.map((draft) =>
                        <SidebarLink key={draft.id} name={draft.name ?? draft.id} href={`/components/${draft.id}`} />
                    )}
                </div>
            }
                </div>
    </ScrollArea>
}

