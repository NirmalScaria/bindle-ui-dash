export default async function ComponentHome({ params }: { params: { componentName: string } }) {
    return <div className="w-full h-full flex flex-row justify-center items-center text-center font-bold text-lg">
        component<br /> {params.componentName}
    </div>
}