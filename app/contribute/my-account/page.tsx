import { Description, Heading } from "@/components/design/Texts";

export default async function MyAccountPage() {
    return <div className="flex flex-col h-full w-full items-start pt-4">
        <Heading>Edit Component</Heading>
        <Description>You can edit the component details here and it will be updated for everyone. Make sure to update the documentation to match the new code you write here.</Description>
    </div>
}