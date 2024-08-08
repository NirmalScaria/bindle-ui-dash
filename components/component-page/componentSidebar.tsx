"use client";

import { cn } from "@/lib/utils";
import { House, Menu, X } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"




const pages = [
    {
        name: "Introduction",
        icon: <House size={20} />,
        href: "/",
    },
]

export default function ComponentSidebar({ className }: { className?: string }) {
    const pathname = usePathname()
    return <div className={cn("flex flex-col z-10", className)}>
        <div className={"h-screen w-[280px] fixed flex-col gap-2 pt-2 px-4 hidden md:flex justify-between"}>
            <div className="flex flex-col gap-2 ml-4">
                <ComponentSidebarContent />
            </div>
        </div>
    </div>
}

export function ComponentSidebarContent() {
    return <ScrollArea className="h-screen">
        <div className="flex flex-col gap-3">
            <span className="font-medium text-sm">
                Getting Started
            </span>
        </div>
    </ScrollArea>
}

function SidebarItem({ name, icon, href }: { name: string, icon: any, href: string }) {
    const pathname = usePathname()
    var activeClass = "text-black/70 hover:bg-white/5"
    if (pathname === href) {
        activeClass = "bg-white/10 text-black"
    }
    return <a href={href} className={"flex flex-row gap-2 text-sm font-regular items-center rounded-md transition-all hover:text-black " + activeClass}>
        {icon}
        {name}
    </a>
}