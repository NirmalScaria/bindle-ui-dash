"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLink({ name, href }: { name: string, href: string }) {
    const pathname = usePathname()
    const formattedName = name.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())
    return <Link href={href} className={cn("text-[0.9rem] py-[0.2rem]  hover:underline", pathname == href ? "text-black font-medium" : "text-black/50")}>
        {formattedName}
    </Link>
}