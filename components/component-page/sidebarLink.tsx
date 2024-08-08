"use client";
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SidebarLink({ name, href }: { name: string, href: string }) {
    const pathname = usePathname()
    return <Link href={href} className={cn("text-[0.9rem] py-1 hover:text-black hover:underline transition-colors", pathname == href ? "text-black font-medium" : "text-black/50")}>
        {name}
    </Link>
}