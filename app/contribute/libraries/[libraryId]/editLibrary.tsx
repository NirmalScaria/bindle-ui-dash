"use client";

import { Description, Heading, Heading3 } from "@/components/design/Texts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Component } from "@/models/component";
import { Library } from "@/models/library";
import { Loader2, PlusCircle } from "lucide-react";
import Link from "next/link";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import publishLibraryAction from "@/actions/publishLibrary";
import { useToast } from "@/components/ui/use-toast";



export default function EditLibrary({ library }: { library: Library }) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [published, setPublished] = useState(false);
    async function publishLibrary() {
        setLoading(true);
        const resp = await publishLibraryAction({ libraryId: library.id });
        if (resp.error) {
            toast({
                title: "Error publishing the library",
                description: resp.error,
            })
            setLoading(false);
            return;
        }
        setPublished(true);
        setLoading(false);
    }
    return <div className="flex flex-col h-full w-full items-start">
        <div className="flex flex-row gap-2 items-center justify-between w-full">
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
            {library.status != "public" && <Dialog>
                <DialogTrigger><Button size="sm" variant="default">Publish</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        {published ? <>
                            <DialogTitle>Library published successfully.</DialogTitle>
                            <DialogDescription>
                                The library has been published and is now available for the public.
                            </DialogDescription>
                        </>
                            :
                            <>
                                <DialogTitle>Make the library Public?</DialogTitle>
                                <DialogDescription>
                                    This will publish the library for the public and this action cannot be undone. You will be able to add and edit the components later.
                                </DialogDescription>
                            </>
                        }
                    </DialogHeader>
                    <DialogFooter>
                        {published ? <>
                            <Button size="sm" variant="default" onClick={() => {
                                window.location.reload();
                            }}>
                                Done
                            </Button>

                        </> :
                            <>
                                <DialogClose>
                                    <Button size="sm" variant="secondary">Cancel</Button>
                                </DialogClose>
                                <Button size="sm" variant="default" disabled={loading} onClick={publishLibrary} >
                                    {loading && <Loader2 className="animate-spin mr-2" size={16} />}
                                    Publish
                                </Button>
                            </>}
                    </DialogFooter>
                </DialogContent>
            </Dialog>}


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
                <Link href={`/contribute/libraries/${library.id}/new-component`} className="p-5 flex text-gray-700 hover:shadow-md transition-shadow font-medium gap-3 flex-col border justify-center rounded-md items-center min-h-[10rem]">
                    <PlusCircle size={34} className="text-gray-500" />
                    Create a New Component
                </Link>
                {library.components?.map(component => {
                    return <ComponentPreview key={component.id} component={component} library={library} />
                })}
            </div>

            {library.drafts && library.drafts.length > 0 && <><div className="flex flex-col gap-2">
                <Heading3>Drafts</Heading3>
                <Description>These are component drafts within this library. To see all drafts,
                    <Link href="/contribute" className="underline">
                        click here
                    </Link>
                </Description>
                <Separator />
            </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {library.drafts?.map(component => {
                        return <ComponentPreview key={component.id} component={component} library={library} />
                    })}
                </div></>}

        </div>
    </div>
}

function ComponentPreview({ component, library }: { component: Component, library: Library }) {
    var message = "This component is in draft stage. Documentation and publishing are pending."
    if (component.status == "documentation") {
        message = "This component is in draft stage. Documentation is finished and publishing is pending."
    }
    if (component.status == "published") {
        message = "This component is published and is available for users."
    }
    return <div
        className="p-5 flex text-gray-800 items-start font-semibold text-xl gap-2 flex-col border justify-start rounded-md min-h-[10rem]">
        <div className="flex flex-row gap-1 items-center">
            {component.id.split(".")[1]}
            <div className="flex flex-col">
                <div className="bg-green-500 text-[11px] leading-4 p-2 font-medium py-0.5 rounded-full text-white">{component.status == "published" ? "Published" : "Draft"}</div>
            </div>
        </div>
        <div className="text-sm font-normal text-gray-500">
            {message}
        </div>
        <Link
            href={component.status == "published" ? `/contribute/edit-component/${component.id}` : `/contribute/edit-draft/${component.uid}`}
            className="w-full">
            <Button className="w-full" size="sm" variant="secondary">
                Edit Component
            </Button>
        </Link>
        <Link
            href={component.status == "published" ? `/contribute/edit-component-documentation/${component.id}` : `/contribute/edit-draft-documentation/${component.uid}`} className="w-full">
            <Button className="w-full" size="sm" variant="default">
                {component.status == "published" ? "Edit Documentation" : "Edit Documentation and Publish"}
            </Button>
        </Link>
    </div>
}