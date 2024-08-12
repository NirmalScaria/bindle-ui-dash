import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export default function Layout({ children }: { children: React.ReactNode }) {
    return <body className={cn(inter.className)}>
        <div className="h-screen">
            <div className="h-full w-full flex flex-row lg:gap-10 justify-center items-start overflow-y-auto">
                {children}
            </div>
        </div>

        <Toaster />
    </body>
}