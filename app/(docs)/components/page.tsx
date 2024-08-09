import LocationIndicator from "@/components/locationIndicator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default async function ComponentHome() {
    return <div className="flex flex-col m-5 gap-3 max-w-[50rem]">
        <LocationIndicator />
        <h1 className="text-3xl font-bold">Introduction</h1>
        <p className="text-gray-500 text-lg max-w-[35rem]">
            Collaborative platform where designers publish components, and users effortlessly integrate them into projects.
        </p>
        <p className="max-w-[50rem] text-[0.9rem] my-3">
            Bindle-UI is a set of design libraries and components that are published by designers and developers around the world. These components can be easily integrated into projects using the bindle-ui CLI.
        </p>
        <p className="max-w-[50rem] text-[0.9rem]">
            Bindle is not a design library exactly. (Fun fact: That is what bindle stands for). It is a library of design libraries. It is libraryception.
        </p>
        <h2 className="text-2xl font-bold mt-5">How it works?</h2>
        <hr className="w-[50rem]" />
        <p className="max-w-[50rem] text-[0.9rem]">
            For the end users, it is as simple as running a single command. The component will be copied to your project, (along with the dependancies if any) and you can start using it right away.
        </p>
        <p className="max-w-[50rem] text-[0.9rem]">
            The components are not installed to node_modules, but copied to your project. This allows the components to be modified to your liking.
        </p>
        <Link href="/components/input" className="w-full">
            <Button variant="default" className="w-full">
                Browse Components
            </Button>
        </Link>
        <h2 className="text-2xl font-bold mt-5">Publish your own library</h2>
        <hr className="w-[50rem]" />
        <p className="max-w-[50rem] text-[0.9rem]">
            You can publish your own library of components to bindle. This will allow other users to use your components in their projects. Your library will be credited to you, and you can also add a link to your portfolio.
        </p>
        <p className="max-w-[50rem] text-[0.9rem]">
            It takes less than 5 minutes to publish a library. You can also update your library at any time.
        </p>
        <Link href="/components/input" className="w-full">
            <Button variant="secondary" className="w-full">
                Contribute
            </Button>
        </Link>
    </div>
}