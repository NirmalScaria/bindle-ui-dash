import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import SidebarLink from "./sidebarLink";
import { Bug, User2 } from "lucide-react";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { CgBulb } from "react-icons/cg";

export default function ComponentRightBar() {
    return <ScrollArea className="h-screen mt-7 hidden lg:flex w-[min(280px,15vw)] ">
        <div className="flex flex-col gap-3">
            <div className="flex flex-col">
                <span className="font-bold text-sm mb-2">
                    Credits
                </span>
                <span className="text-sm mb-0 text-gray-500">
                    This component is created and maintained by
                </span>
                <div className="flex flex-col px-1.5 py-1 w-full my-2 border rounded-md pr-4">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-col gap-0 m-2">
                            <span className="text-sm font-semibold leading-none">
                                Nirmal Scaria
                            </span>
                            <Link href="/contributors/@scaria" className="w-full text-gray-500 underline text-sm">
                                @scaria
                            </Link>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Link href="https://github.com/NirmalScaria" target="_blank" className="border w-full hover:bg-gray-200 rounded-md transition-colors text-gray-500">
                                <BsGithub size={15} className="m-1.5 text-gray-700" />
                            </Link>
                            <Link href="https://x.com/scaria0dev" target="_blank" className="border w-full hover:bg-gray-200 rounded-md transition-colors text-gray-500">
                                <BsTwitterX size={15} className="m-1.5 text-gray-700" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <span className="font-bold text-sm">
                On this page
            </span>
            <div className="flex flex-col">
                <SidebarLink name="Introduction" href="#introduction" />
                <SidebarLink name="Installation" href="#installation" />
                <SidebarLink name="Usage" href="#usage" />
                <SidebarLink name="Examples" href="#examples" />
                <div className="flex flex-col pl-4">
                    <SidebarLink name="Secondary" href="#examples" />
                    <SidebarLink name="Primary" href="#examples" />
                    <SidebarLink name="Secondary" href="#examples" />
                </div>
            </div>
            <span className="font-bold text-sm">
                Contribute
            </span>
            <div className="flex flex-col">
                <Link href="https://github.com/NirmalScaria/bindle-ui/issues" className={cn("flex items-center flex-row gap-2 text-[0.9rem] py-1  hover:underline", "text-black/50")}>
                    <Bug size={17} className="text-gray-700" />
                    Report Issue
                </Link>
                <Link href="https://www.linkedin.com/in/nirmal-scaria/" className={cn("flex items-center flex-row gap-2 text-[0.9rem] py-1  hover:underline", "text-black/50")}>
                    <CgBulb size={17} className="text-gray-700" />
                    Suggest Feature
                </Link>
            </div>
        </div>
    </ScrollArea>
}