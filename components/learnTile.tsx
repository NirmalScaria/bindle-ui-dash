import Link from "next/link";
import { MagicCard } from "./magicui/magic-card";

export default function LearnTile({ href, title, description }: { href: string, title: string, description: string }) {
    return <Link href={href} className="h-auto">
        <MagicCard className="bg-transparent hover:bg-white/5 transition-all h-full border border-white/20" gradientColor="#ffffff10">
            <div className="flex flex-col gap-2 p-4  rounded-lg">
                <h3 className="text-lg font-medium text-white/80">{title}</h3>
                <p className="text-white/50 text-sm">{description}</p>
            </div>
        </MagicCard>
    </Link>
}