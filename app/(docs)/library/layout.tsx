import LibrarySidebar from "@/components/library-page/librarySidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <><LibrarySidebar />
        <div className="flex flex-col min-h-screen justify-between">
            <div className="flex flex-row">
                <div className="md:pl-[280px] w-full">
                    {children}
                </div>
            </div>
        </div>
    </>
}