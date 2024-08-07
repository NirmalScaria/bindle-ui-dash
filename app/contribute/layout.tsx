import BottomBar from "@/components/bottomBar";
import ContributeSidebar from "@/components/contributeSidebar";
import ContributeTopBar from "@/components/contributeTopbar";
export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col">
        <ContributeSidebar />
        <div className="flex flex-col min-h-screen justify-between">
            <div className="flex flex-row">
                <div className="md:pl-[280px] w-full">
                    <main className="bg-[#031525] flex flex-col pb-10 p-4 md:p-8 items-center">
                        <ContributeTopBar />
                        {children}
                    </main>
                </div>
            </div>
            <BottomBar />
        </div>
    </div>
}