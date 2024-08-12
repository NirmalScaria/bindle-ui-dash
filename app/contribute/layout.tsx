import ContributeSidebar, { ContributeSidebarContent } from "@/components/contribute-page/contributeSidebar";
import ContributeTopBar from "@/components/contributeTopbar";
import DocsFooter from "@/components/docsFooter";
import DocsTopbar from "@/components/docsTopbar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export default function Layout({ children }: { children: React.ReactNode }) {
    return <body className={cn(inter.className)}>
        <div className="h-screen">
            <div className="h-full w-full flex flex-row lg:gap-10 justify-center items-start overflow-y-auto">
                <>
                    <ContributeTopBar sidebarContent={<ContributeSidebarContent />} />
                    <div className="sticky top-[4rem] h-[calc(100vh-4rem)]">
                        <ContributeSidebar />
                    </div>
                    <div className="flex mt-[4rem] flex-col justify-between w-full flex-grow max-w-[60rem] lg:max-w-[min(55vw,60rem)] overflow-y-visible">
                        <div className="flex flex-col w-full min-h-screen">
                            <div className="flex flex-col m-5 gap-4 z-10 min-h-screen">
                                {children}
                            </div>
                            <DocsFooter />
                        </div>
                    </div>
                    <div className="sticky top-[4rem] h-[calc(100vh-4rem)]">
                        <div className="h-screen mt-7 hidden lg:flex w-[min(280px,15vw)] pr-5" />
                    </div></>
            </div>
        </div>

        <Toaster />
    </body>
}