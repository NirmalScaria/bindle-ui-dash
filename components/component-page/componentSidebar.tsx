"use server";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { House } from "lucide-react";
import SidebarLink from "./sidebarLink";
import { getAppSS } from "firebase-nextjs/server/auth";

export default async function ComponentSidebar({ className }: { className?: string }) {
    return <div className={cn("flex flex-col z-10", className)}>
        <div className={"h-screen w-[320px] fixed flex-col gap-2 pt-2 px-4 hidden md:flex justify-between"}>
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
    return <ScrollArea className="h-screen">
        <div className="flex flex-col gap-3">
            <div className="flex flex-col">
                <span className="font-semibold text-sm mb-3">
                    Getting Started
                </span>
                <SidebarLink name="Introduction" href="/components" />
                <SidebarLink name="Installation" href="/components/installation" />
                <SidebarLink name="CLI" href="/components/cli" />
            </div>
            <div className="flex flex-col pb-[7rem]">
                <span className="font-semibold text-sm mb-3">
                    Components
                </span>
                {components.map((component) =>
                    <SidebarLink key={component.id} name={component.name ?? component.id} href={`/components/${component.id}`} />
                )}
            </div>
        </div>
    </ScrollArea>
}

