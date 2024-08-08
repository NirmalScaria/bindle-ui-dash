import { PanelRightCloseIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function DocsTopbar({sidebarContent}: {sidebarContent: JSX.Element}) {
    return <div className="flex flex-row items-center h-[4rem] w-full fixed px-2">
        <Sheet>
            <SheetTrigger className="block md:hidden">
                <div className="p-2 cursor-pointer">
                    <PanelRightCloseIcon />
                </div>
            </SheetTrigger>
            <SheetContent side="left">
                {sidebarContent}
            </SheetContent>
        </Sheet>
    </div>
}