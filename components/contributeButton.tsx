import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ContributeButton({className}: {className?: string}) {
    return <Link href="/contribute" className={cn("bg-gradient-to-tl h-[32px] from-[#c278ba]  to-[#ae58a4] opacity-[95%] bg-cover border-white/10 hover:border-white/50 border text-white text-sm font-medium px-3 py-[0.3rem] rounded-md hover:opacity-100 transition-all", className)}>
        Publish your Component
    </Link>
}