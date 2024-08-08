import ComponentSidebar, { ComponentSidebarContent } from "@/components/component-page/componentSidebar";
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { PanelRightCloseIcon } from "lucide-react";


export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="h-screen w-screen">
        <div className="flex flex-row items-center h-[4rem] w-full border-b fixed px-2">
            <Sheet>
                <SheetTrigger className="block md:hidden">
                    <div className="p-2 cursor-pointer">
                        <PanelRightCloseIcon />
                    </div>
                </SheetTrigger>
                <SheetContent side="left">
                    <ComponentSidebarContent />
                </SheetContent>
            </Sheet>
        </div>
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