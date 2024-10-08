"use client";
import getContributor from "@/actions/getContributor";
import { cn } from "@/lib/utils";
import { Contributor } from "@/models/contributor";
import { AppWindow, Bug } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsGithub, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { CgBulb } from "react-icons/cg";
import { ScrollArea } from "../ui/scroll-area";
import SidebarLink from "./sidebarLink";
import { usePathname } from 'next/navigation'
import getComponentDetails from "@/actions/getComponentDetails";
import getLibraryDetails from "@/actions/getLibraryDetails";

export default function LibraryRightbarCS() {
    const [owner, setOwner] = useState<Contributor | null>(null);
    const [components, setComponents] = useState<string[]>([])
    const pathname = usePathname()
    useEffect(() => {
        if (pathname != null) {
            getLibraryDetails({ id: pathname.split('/')[pathname.split('/').length - 1] }).then((data) => {
                setOwner(data.owner ?? null)
                setComponents(data.components ?? [])
            })
        }
    }, [pathname])
    // useEffect(() => {
    //     if (owner?.id != null) {
    //         getContributor({ id: owner.id }).then((data) => {
    //             if ("error" in data) {
    //                 return;
    //             }
    //             setOwner(data)
    //         })

    //     }
    // }, [owner?.id])
    return <ScrollArea className="h-screen mt-7 hidden lg:flex w-[min(280px,15vw)] pr-5">
        <div className="flex flex-col gap-3 pb-[200px]">
            {owner != null && <div className="flex flex-col">
                <span className="font-bold text-sm mb-2">
                    Created by
                </span>
                <div className="flex flex-col  w-full my-2 rounded-md pr-4">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-col gap-0">
                            <span className="text-sm font-semibold leading-none">
                                {owner.displayName}
                            </span>
                            <Link href={`/contributors/${owner.id}`} className="w-full text-gray-500 underline text-sm">
                                {owner.id}
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            {owner.github && owner.github != "" && <Link href={owner.github} target="_blank" className="border w-full hover:bg-gray-200 rounded-md transition-colors text-gray-500">
                                <BsGithub size={15} className="m-1.5 text-gray-700" />
                            </Link>}
                            {owner.twitter && owner.twitter != "" && <Link href={owner.twitter} target="_blank" className="border w-full hover:bg-gray-200 rounded-md transition-colors text-gray-500">
                                <BsTwitterX size={15} className="m-1.5 text-gray-700" />
                            </Link>}
                            {owner.linkedin && owner.linkedin != "" && <Link href={owner.linkedin} target="_blank" className="border w-full hover:bg-gray-200 rounded-md transition-colors text-gray-500">
                                <BsLinkedin size={15} className="m-1.5 text-gray-700" />
                            </Link>
                            }
                            {owner.website && owner.website != "" && <Link href={owner.website} target="_blank" className="border w-full hover:bg-gray-200 rounded-md transition-colors text-gray-500">
                                <AppWindow size={15} className="m-1.5 text-gray-700" />
                            </Link>
                            }
                        </div>
                    </div>
                    {owner.sponsorLink && owner.sponsorLink != "" && <Link href={owner.sponsorLink} className="w-full mt-2 underline text-gray-500 hover:text-black transition-colors text-sm">
                        Sponsor the creator
                    </Link>
                    }
                </div>
            </div>}
            <span className="font-bold text-sm">
                On this page
            </span>
            <div className="flex flex-col">
                <SidebarLink name="Introduction" href="#introduction" />
                <SidebarLink name="Components" href="#components" />
                <div className="flex flex-col pl-4">
                    {
                        components.map((example, index) => {
                            return <Link href={`#${example}`} className={cn("text-[0.9rem] py-[0.2rem]  hover:underline", "text-black/50")}>
                                {example}
                            </Link>
                            return <SidebarLink key={index} name={example} href={`#${example}`} />
                        })
                    }
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