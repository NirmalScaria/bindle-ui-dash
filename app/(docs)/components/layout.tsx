import ComponentSidebar, { ComponentSidebarContent } from "@/components/component-page/componentSidebar";
import DocsFooter from "@/components/docsFooter";
import DocsTopbar from "@/components/docsTopbar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="h-screen">
        <DocsTopbar sidebarContent={<ComponentSidebarContent />} />
        <div className="h-full w-full flex flex-col overflow-y-visible ">
            <ComponentSidebar className="mt-[4rem]" />
            <div className="flex flex-col justify-between">
                <div className="flex flex-row">
                    <div className="md:pl-[280px] w-full flex flex-col min-h-screen">
                        {children}
                        <DocsFooter />
                    </div>
                </div>
            </div>
        </div>
    </div>
}