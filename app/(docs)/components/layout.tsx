import ComponentSidebar, { ComponentSidebarContent } from "@/components/component-page/componentSidebar";
import DocsFooter from "@/components/docsFooter";
import DocsTopbar from "@/components/docsTopbar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="h-screen flex flex-col">
        <DocsTopbar sidebarContent={<ComponentSidebarContent />} />
        <div className="h-full w-full flex flex-row mt-[4rem]">
            <ComponentSidebar className="" />
            <div className="flex flex-col justify-between w-full">
                <div className="flex flex-row w-full">
                    <div className="md:pl-[280px] flex flex-col min-h-screen w-full overflow-hidden">
                        {children}
                        <DocsFooter />
                    </div>
                </div>
            </div>
        </div>
    </div>
}