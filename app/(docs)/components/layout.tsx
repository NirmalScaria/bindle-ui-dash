

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="h-screen">
        <div className="h-full w-full flex flex-row justify-center items-start overflow-y-auto">
            {children}
        </div>
    </div>
}