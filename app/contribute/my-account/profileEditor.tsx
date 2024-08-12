"use client";

import editUser from "@/actions/edituser";
import { Description, Heading3 } from "@/components/design/Texts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Contributor } from "@/models/contributor";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function ProfileEditor({ currentUser }: { currentUser: Contributor }) {
    const [user, setUser] = useState(currentUser);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    async function submitChanges() {
        setLoading(true);
        const response = await editUser({ user });
        if (response.error) {
            toast({
                title: "Failed to save user",
                description: response.error,
            })
            setLoading(false);
            return;
        }
        toast({
            title: "User saved",
            description: "User details saved successfully",
        })
        setLoading(false);
        return;
    }
    return <>
        <div className="flex flex-col w-full">
            <Heading3>Display Name</Heading3>
            <Description>This name will appear on pages for components you publish</Description>
            <Input type="text" placeholder="Linus Torvalds" value={user.displayName} onChange={(e) => setUser({ ...user, displayName: e.target.value })} />
        </div>
        <div className="flex flex-col w-full">
            <Heading3>User Id</Heading3>
            <Description>This is your unique id in the system and will be visible to users too. Start with @.</Description>
            <Input type="text" value={user.id} placeholder="@torvalds" onChange={(e) => setUser({ ...user, id: e.target.value })} />
        </div>
        <div className="flex flex-col w-full">
            <Heading3>GitHub (Optional)</Heading3>
            <Description>Link to your github profile. (Do not enter the username. Enter the whole link)</Description>
            <Input type="text" value={user.github} placeholder="https://github.com/torvalds" onChange={(e) => setUser({ ...user, github: e.target.value })} />
        </div>
        <div className="flex flex-col w-full">
            <Heading3>Sponsor Link (Optional)</Heading3>
            <Description>Link to your sponsor page. (Link to any platform like buymeacoffee or github sponsors)</Description>
            <Input type="text" value={user.sponsorLink} placeholder="https://github.com/sponsors/torvalds" onChange={(e) => setUser({ ...user, sponsorLink: e.target.value })} />
        </div>
        <div className="flex flex-col w-full">
            <Heading3>Website (Optional)</Heading3>
            <Description>Link to your personal website. (Do not enter the username. Enter the whole link)</Description>
            <Input type="text" value={user.website} placeholder="https://torvalds.com" onChange={(e) => setUser({ ...user, website: e.target.value })} />
        </div>
        <div className="flex flex-col w-full">
            <Heading3>LinkedIn (Optional)</Heading3>
            <Description>Link to your LinkedIn profile. (Do not enter the username. Enter the whole link)</Description>
            <Input type="text" value={user.linkedin} placeholder="https://linkedin.com/in/torvalds" onChange={(e) => setUser({ ...user, linkedin: e.target.value })} />
        </div>
        <div className="flex flex-col w-full">
            <Heading3>Twitter (Optional)</Heading3>
            <Description>Link to your Twitter profile. (Do not enter the username. Enter the whole link)</Description>
            <Input type="text" value={user.twitter} placeholder="https://twitter.com/torvalds" onChange={(e) => setUser({ ...user, twitter: e.target.value })} />
        </div>
        <Button className="w-full" onClick={submitChanges} disabled={loading}>
            {loading && <Loader2 className="animate-spin mr-2" size={16} />}
            Save Changes
        </Button>
    </>
}