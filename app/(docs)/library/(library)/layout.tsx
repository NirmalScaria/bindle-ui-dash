import ComponentRightBar from "@/components/component-page/componentRightbar"
import ComponentRightBarCS from "@/components/component-page/componentRightbarCS"
import ComponentSidebar, { ComponentSidebarContent } from "@/components/component-page/componentSidebar"
import LibraryRightbarCS from "@/components/component-page/libraryRightbarCS"
import DocsFooter from "@/components/docsFooter"
import DocsTopbar from "@/components/docsTopbar"

export default async function Layout({ children }: { children: React.ReactNode }) {
    return <>
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
            <LibraryRightbarCS />
        </div>
    </>
}