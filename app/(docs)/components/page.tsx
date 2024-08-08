import LocationIndicator from "@/components/locationIndicator"
import Image from "next/image"
export default async function ComponentHome() {
    return <div className="flex flex-col m-5 gap-3">
        <LocationIndicator />
        <h1 className="text-3xl font-bold">Introduction</h1>
        <p className="text-gray-500 max-w-[35rem]">
            Collaborative platform where designers publish components, and users effortlessly integrate them into projects.
        </p>
    </div>
}