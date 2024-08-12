import { Command, PanelRightCloseIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import ContributeButton from "./contributeButton";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
export default function DocsTopbar({ sidebarContent }: { sidebarContent: JSX.Element }) {
    return <div className="flex mr-4 border-b border-white/40 -pr-2 flex-row items-center h-[4rem] w-full fixed px-2 pl-5 lg:px-4 justify-between backdrop-blur bg-white/20 z-20">
        <Sheet>
            <SheetTrigger className="block lg:hidden">
                <div className="p-2 cursor-pointer">
                    <PanelRightCloseIcon />
                </div>
            </SheetTrigger>
            <SheetContent side="left">
                {sidebarContent}
            </SheetContent>
        </Sheet>
        <div className=" flex-row gap-6 p-4 items-center hidden lg:flex">
            <h1 className="text-md flex flex-row gap-2 justify-between w-full font-bold text-black/80 items-center">
                <div className="flex flex-row gap-2 items-center">
                    <Image alt="bindle-ui logo" className="rounded-md" width={25} height={25} src="/logo.png" />
                    Bindle UI
                </div>
            </h1>
            <Link href="/components" className="text-[0.95rem] transition-all text-gray-500 hover:text-gray-600">Components</Link>
            <Link href="/components" className="text-[0.95rem] transition-all text-gray-500 hover:text-gray-600">Showcase</Link>
        </div>
        <div className="flex-row flex gap-1 p-4 pl-2 items-center lg:w-auto w-full">
            <ContributeButton  className="hidden lg:block"/>
            <div className="px-2 py-1.5 bg-black/5 rounded-md border border-black/10 text-sm text-black/50 flex lg:hidden flex-row w-full">
                Search...
            </div>
            <div className="px-2 py-1.5 bg-black/5 rounded-md border border-black/10 text-sm text-black/50 lg:flex hidden flex-row w-[300px] justify-between">
                Search documentation...
                <div className="text-xs bg-black/5 border border-black/10 flex flex-row items-center justify-center px-1.5 rounded-sm gap-1">
                    <Command size={10} />
                    K
                </div>
            </div>
            <Link href="https://github.com/NirmalScaria/bindle-ui" className="p-2 transition-all hover:bg-black/5 rounded-md">
                <BsGithub size={18} />
            </Link>
            <Link href="https://x.com/scaria0dev" className="p-2 transition-all hover:bg-black/5 rounded-md">
                <BsTwitterX size={18} />
            </Link>
        </div>
    </div>
}