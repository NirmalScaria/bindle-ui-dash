"use client";

import { Description, Heading, Heading3 } from "@/components/design/Texts";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Library } from "@/models/library";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function EditLibrary({ library }: { library: Library }) {
    return <div className="flex flex-col h-full w-full items-start">
        <div className="flex flex-row gap-2 items-center">
            <Heading>
                {library.name ?? library.id}
            </Heading>
            <div className="flex flex-col">
                {library.status == "public" ?
                    <Badge className="bg-green-500">Published</Badge> :
                    <Badge className="bg-yellow-500">Private</Badge>
                }
            </div>
        </div>
        <Description>A library is a container of components. You can manage the library and its components from here.</Description>
        <div className="flex flex-col w-full gap-5 mt-5 max-w-[55rem]">
            <div className="flex flex-col gap-2">
                <Heading3>Components</Heading3>
                <Description>These components belong to this library. To create independant components outside the library, <Link href="/contribute/new-component" className="underline">
                    click here
                </Link>
                </Description>
                <Separator />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {library.components?.map(component => {
                    return <div key={component.id} className="flex flex-row gap-2 items-center">
                        <Heading3>{component.name}</Heading3>
                        <Badge className="bg-green-500">{component.status}</Badge>
                    </div>
                })}
                {library.components?.length == 0 &&
                    <Link href={`/contribute/libraries/${library.id}/new-component`} className="p-5 flex text-gray-700 hover:shadow-md transition-shadow font-medium gap-3 flex-col border justify-center rounded-md items-center min-h-[10rem]">
                        <PlusCircle size={34} className="text-gray-500" />
                        Create a New Component
                    </Link>
                }
            </div>

        </div>
    </div>
}