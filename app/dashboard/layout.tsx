import BottomBar from "@/components/bottomBar";
import MySidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export default function Layout({ children }: { children: React.ReactNode }) {
    return <body className={cn(inter.className, "text-white", "bg-[#031525]")}>
        <div className="flex flex-col">
            <MySidebar />
            <div className="flex flex-col min-h-screen justify-between">
                <div className="flex flex-row">
                    <div className="md:pl-[280px] w-full">
                        {children}
                    </div>
                </div>
                <BottomBar />
            </div>
            <Toaster />
        </div >
    </body>
}