"use client";

import { Description, Heading } from "@/components/design/Texts";
import { Badge } from "@/components/ui/badge";
import { Library } from "@/models/library";

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
        <div className="flex flex-col w-full gap-5 mt-3 max-w-[55rem]">
        </div>
    </div>
}