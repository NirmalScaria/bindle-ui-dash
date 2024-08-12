"use client";

import { cn } from "@/lib/utils";
import { House, Menu, X } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useState } from "react";

const poppins = Poppins({ weight: ["300", "400", "500", "600"], subsets: ['latin'] });

const pages = [
    {
        name: "Introduction",
        icon: <House size={20} />,
        href: "/",
    },
]

export default function LibrarySidebar() {
    const [open, setOpen] = useState(false);

    var openClass = "hidden"
    if (open) {
        openClass = "flex"
    }
    return <div className={cn("flex flex-col z-10", poppins.className)}>
        <div className="flex flex-row md:hidden w-full">
            <button onClick={() => setOpen(!open)} className=" text-black/70 p-2 px-4">
                <Menu />
            </button>
            <div className="flex flex-row gap-2 py-3">
                <h1 className="text-lg flex flex-row gap-2 font-semibold text-black/80 items-center">
                    <Image alt="bindle-ui logo" width={30} className="rounded-md" height={30} src="/logo.png" />Bindle UI
                </h1>
            </div>
        </div>
        <div className={"h-screen w-[280px] fixed border-r border-black/20 flex flex-col gap-2 pt-4 md:flex justify-between " + openClass}>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 p-4">
                    <h1 className="text-lg flex flex-row gap-2 justify-between w-full font-semibold text-black/80 items-center">
                        <div className="flex flex-row gap-2 items-center">
                            <Image alt="bindle-ui logo" className="rounded-md" width={35} height={35} src="/logo.png" />
                            Bindle UI
                        </div>
                        <div className="p-1 rounded-md border-black/20 border md:hidden" onClick={() => { setOpen(false); }}>
                            <X onClick={() => setOpen(false)} className="cursor-pointer" />
                        </div>
                    </h1>
                </div>
                <hr className="border-black/20 w-full" />
                <div className="flex flex-col gap-1 mt-2">
                    {pages.map((page, index) => <SidebarItem key={index} {...page} />)}
                </div>
            </div>
        </div>
    </div>
}

function SidebarItem({ name, icon, href }: { name: string, icon: any, href: string }) {
    const pathname = usePathname()
    var activeClass = "text-black/70 hover:bg-white/5"
    if (pathname === href) {
        activeClass = "bg-white/10 text-black"
    }
    return <a href={href} className={"flex flex-row gap-2 text-sm font-regular items-center p-2 rounded-md px-4 mx-2 transition-all hover:text-black " + activeClass}>
        {icon}
        {name}
    </a>
}