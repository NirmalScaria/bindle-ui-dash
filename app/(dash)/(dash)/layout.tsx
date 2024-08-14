import ComponentSidebar, { ComponentSidebarContent } from "@/components/component-page/componentSidebar";
import DocsTopbar from "@/components/docsTopbar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return <>
        <DocsTopbar sidebarContent={<ComponentSidebarContent />} />
        <div className="sticky top-[4rem] h-[calc(100vh-4rem)]">
            <ComponentSidebar />
        </div>
        <div className="flex mt-[4rem] flex-col justify-between w-full flex-grow max-w-[60rem] lg:max-w-[min(55vw,60rem)] overflow-y-visible">
            <div className="flex flex-col w-full min-h-screen">
                <div className="flex flex-col m-5 gap-4 z-10">
                    {children}
                </div>
            </div>
        </div >
        <div className="sticky top-[4rem] h-[calc(100vh-4rem)]">
            <div className="h-screen mt-7 hidden lg:flex w-[min(280px,15vw)] pr-5" />
        </div>
    </>
}