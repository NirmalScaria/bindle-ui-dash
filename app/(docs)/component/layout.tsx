import ComponentSidebar from "@/components/component-page/componentSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <><ComponentSidebar />
        <div className="flex flex-col min-h-screen justify-between">
            <div className="flex flex-row">
                <div className="md:pl-[280px] w-full">
                    {children}
                </div>
            </div>
        </div>
    </>
}