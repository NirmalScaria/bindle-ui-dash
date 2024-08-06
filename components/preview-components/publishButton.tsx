"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react";
import publishComponentAction from "@/actions/publishComponent";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation'


export default function PublishButton({ componentId }: { componentId: string }) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast()
    const router = useRouter()
    async function publishComponent() {
        setLoading(true);
        const response = await publishComponentAction({ componentId });
        if (response.error) {
            toast({
                title: "Error publishing component",
                description: response.error,
            })
            setLoading(false);
            return;
        }
        toast({
            title: "Component published",
            description: "Your component is now available for everyone to use",
        })
        router.replace(`/contribute`);
    }
    return (
        <Dialog>
            <DialogTrigger className="w-full"><Button
                variant="secondary"
                size="default"
                className="w-full mt-3"
            >
                Publish Component
            </Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This will publish the component and make it available for everyone to use.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" size="sm">
                        <DialogClose onClick={() => { setLoading(false); }}>Close</DialogClose>
                    </Button>
                    <Button variant="secondary" size="sm" disabled={loading} onClick={publishComponent}>
                        {loading && <Loader2 className="w-6 h-6 mr-4 animate-spin" />}
                        Publish
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}