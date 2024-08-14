"use server";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getAppSS } from "firebase-nextjs/server/auth";
import SidebarLink from "./sidebarLink";

export default async function ComponentSidebar({ className }: { className?: string }) {
    return <div className={cn("flex flex-col z-10", className)}>
        <div className={"h-screen w-[250px] lg:w-[min(280px,15vw)] flex-col gap-2 pt-2 px-4 hidden lg:flex justify-between"}>
            <div className="flex flex-col gap-2 my-4 mx-6">
                <ComponentSidebarContent />
            </div>
        </div>
    </div>
}

export async function ComponentSidebarContent() {
    const app = await getAppSS();
    const db = app.firestore();
    const ref = db.collection("Components").limit(20).select('id', 'name');
    const snapshot = await ref.get();
    const components = snapshot.docs.map(doc => doc.data());
    const libRef = db.collection("Libraries").limit(20).where("status", "==", "public").select('id', 'name');
    const libSnapshot = await libRef.get();
    const libraries = libSnapshot.docs.map(doc => doc.data());
    return <ScrollArea className="h-screen">
        <div className="flex flex-col gap-3">
            <div className="flex flex-col">
                <span className="font-semibold text-sm mb-3">
                    Getting Started
                </span>
                <SidebarLink name="Introduction" href="/components" />
                <SidebarLink name="Installation" href="/installation" />
                <SidebarLink name="Contributing" href="/contributing" />
            </div>
            <div className="flex flex-col">
                <span className="font-semibold text-sm mb-3">
                    Components
                </span>
                {components.map((component) =>
                    <SidebarLink key={component.id} name={component.name ?? component.id} href={`/components/${component.id}`} />
                )}
            </div>
            <div className="flex flex-col pb-[7rem]">
                <span className="font-semibold text-sm mb-3">
                    Libraries
                </span>
                {libraries.map((library) =>
                    <SidebarLink key={library.id} name={library.name ?? library.id} href={`/library/${library.id}`} />
                )}
            </div>
        </div>
    </ScrollArea>
}

