export default function BottomBar() {
    return <div className="flex flex-row w-full border-t border-gray-800 p-10 md:pl-[400px]  gap-3 bg-[#0d2136]">
        <div className="text-lg font-semibold w-1/3">Bindle-UI</div>
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-7">
            <div className="flex flex-col gap-2">
                <a href="https://github.com/NirmalScaria/bindle-ui" className="text-gray-500">Source Code</a>
                <a href="mailto:scaria@scaria.dev" className="text-gray-500">Contact</a>
            </div>
            <div className="flex flex-col gap-2">
                <a href="/terms_of_service" className="text-gray-500">Terms of Service</a>
                <a href="/privacy_policy" className="text-gray-500">Privacy Policy</a>
            </div>
        </div>
    </div>
}