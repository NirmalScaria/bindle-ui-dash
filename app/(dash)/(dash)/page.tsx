import InstallComponent from "@/components/component-page/installComponent";
import CustomSandpack from "@/components/customSandpack";
import { Description } from "@/components/design/Texts";
import LocationIndicator from "@/components/locationIndicator"
import MyCode from "@/components/myCode";
import { Button } from "@/components/ui/button"
import { PublishedComponent } from "@/models/component";
import { getAppSS } from "firebase-nextjs/server/auth";
import Link from "next/link"
import { BsBinoculars } from "react-icons/bs"
export default async function ComponentHome() {
    const app = await getAppSS();
    const db = app.firestore();
    const ref = db.collection("Components").doc("glow-button");
    const glowButton = (await ref.get()).data() as PublishedComponent;
    return <div className="flex flex-col gap-3 ">
        <LocationIndicator />
        <h1 className="text-3xl font-bold">Truly collaborative design library. 💅🏼</h1>
        <p className="text-gray-500 text-lg max-w-[35rem]">
            Bindle-UI is a mega library of beafutiful components created by multiple open source creators.
        </p>
        <div className="flex flex-row gap-2">
            <Link href="/components/glow-button">
                <Button variant="default">
                    <BsBinoculars className="mr-2" />
                    Browse Components
                </Button>
            </Link>
            <Button variant="ghost">
                Learn More
            </Button>
        </div>
        <p className=" text-[0.9rem]">
            Bindle is not a design library exactly. (Fun fact: That is what bindle stands for). It is a mega library of multiple design libraries. It is libraryception.
        </p>
        <h2 className="text-2xl font-bold mt-5">How it works?</h2>
        <hr className="" />
        <p className=" text-[0.9rem]">
            You made some cool component you are proud of? Felt like sharing it with the world? Publish it on Bindle. Bindle understands code! It generates the documentation for your component and the component will be credited to you.
        </p>
        <p className=" text-[0.9rem]">
            End users can use the components in their projects. Installing is as easy as running one single command. That will add all the required dependancies, components, and tailwind configurations automatically!
        </p>
        <h2 className="text-2xl font-bold mt-5">Example</h2>
        <hr className="" />
        <Description>A glow button component that triggers a beautiful glow when triggered. Inspired by the Subscribe button effect on YouTube.</Description>
        <CustomSandpack component={glowButton} />
        <h3 className="text-2xl font-bold mt-4" id="installation">Installation</h3>
        <InstallComponent component={glowButton} />
        <span className="text-[0.9rem]">This will copy the GlowButton component to /components/ui/glow-button.tsx and edit tailwind.config.js to apply the necessary styles.</span>
        <h3 className="text-2xl font-bold mt-4" id="usage">Usage</h3>
        <hr />
        {glowButton.usageSampleCode && <div className="flex flex-col max-h-[300px]">
            <MyCode code={glowButton.usageSampleCode} showLineNumbers={false} />
        </div>}
        <h3 className="text-2xl font-bold mt-4" id="contributing">Contributing</h3>
        <hr />
        <Description>
            Bindle is a community driven project. Everyone is welcome to collaborate. You can contribute in different ways, from creating one new component, to creating a whole new design library on Bindle-UI.
        </Description>
        <Link href="/contribute" className="mb-20">
            <Button variant="default">
                Contribute to Bindle-UI
            </Button>
        </Link>
    </div>
}