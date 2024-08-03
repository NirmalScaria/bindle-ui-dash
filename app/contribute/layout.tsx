import BottomBar from "@/components/bottomBar";
import ContributeSidebar from "@/components/contributeSidebar";
import MySidebar from "@/components/sidebar";
export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col">
        <ContributeSidebar />
        <div className="flex flex-col min-h-screen justify-between">
            <div className="flex flex-row">
                <div className="md:pl-[280px] w-full">
                    {children}
                </div>
            </div>
            <BottomBar />
        </div>
    </div>
}