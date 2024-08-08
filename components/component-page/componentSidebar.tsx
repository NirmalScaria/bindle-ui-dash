"use server";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { House } from "lucide-react";
import SidebarLink from "./sidebarLink";

export default async function ComponentSidebar({ className }: { className?: string }) {
    return <div className={cn("flex flex-col z-10", className)}>
        <div className={"h-screen w-[280px] fixed flex-col gap-2 pt-2 px-4 hidden md:flex justify-between"}>
            <div className="flex flex-col gap-2 ml-4">
                <ComponentSidebarContent />
            </div>
        </div>
    </div>
}

export async function ComponentSidebarContent() {
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
        </div>
    </ScrollArea>
}

