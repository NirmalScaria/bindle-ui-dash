import ComponentSidebar, { ComponentSidebarContent } from "@/components/component-page/componentSidebar";
import DocsFooter from "@/components/docsFooter";
import DocsTopbar from "@/components/docsTopbar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="h-screen">
        <div className="h-full w-full flex flex-row justify-center items-start overflow-y-auto">
            <DocsTopbar sidebarContent={<ComponentSidebarContent />} />
            <div className="sticky top-[4rem] h-[calc(100vh-4rem)]">
                <ComponentSidebar />
            </div>
            <div className="flex mt-[4rem] flex-col justify-between w-full flex-grow max-w-[60rem] lg:max-w-[min(55vw,60rem)] overflow-y-visible">
                <div className="flex flex-col w-full min-h-screen">
                    {children}
                    <DocsFooter />
                </div>
            </div>
            <div className="sticky top-[4rem] h-[calc(100vh-4rem)]">
                <div className="hidden lg:flex w-[min(280px,15vw)]" />
                {/* <ComponentSidebar /> */}
            </div>
        </div>
    </div>
}