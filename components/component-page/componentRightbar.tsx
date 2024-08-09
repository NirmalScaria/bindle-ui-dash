import ComponentSidebar from "./componentSidebar";

export default function ComponentRightBar() {
    return <div className="bg-red-400 sticky top-[4rem] h-[calc(100vh-4rem)]">
        <div className="hidden lg:flex w-[min(280px,15vw)]" />
        <ComponentSidebar />
    </div>
}