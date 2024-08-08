import ComponentSidebar, { ComponentSidebarContent } from "@/components/component-page/componentSidebar";
import DocsTopbar from "@/components/docsTopbar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="h-screen w-screen">
        <DocsTopbar sidebarContent={<ComponentSidebarContent />} />
        <div className="h-full w-full flex flex-col">
            <ComponentSidebar className="mt-[4rem]" />
            <div className="flex flex-col justify-between overflow-auto">
                <div className="flex flex-row ">
                    <div className="md:pl-[280px] w-full  min-h-screen">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>
}