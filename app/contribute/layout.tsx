import BottomBar from "@/components/bottomBar";
import ContributeSidebarOld from "@/components/contributeSidebar";
import ContributeTopBarOld from "@/components/contributeTopbarOld";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function Layout({ children }: { children: React.ReactNode }) {
    return <body className={cn(inter.className, "text-white", "bg-[#031525]")}><div className="flex flex-col">
        <ContributeSidebarOld />
        <div className="flex flex-col min-h-screen justify-between">
            <div className="flex flex-row">
                <div className="md:pl-[280px] w-full">
                    <main className="bg-[#031525] flex flex-col pb-10 p-4 md:p-8 items-center">
                        <ContributeTopBarOld />
                        {children}
                    </main>
                </div>
            </div>
            <BottomBar />
        </div>
    </div>
        <Toaster />
    </body>
}