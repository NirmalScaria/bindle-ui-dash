import Link from "next/link";

export default function DocsFooter() {
    return <div className="flex flex-col md:flex-row p-3 border-t mt-3 w-full text-sm text-gray-500 gap-1">
        <div>Created by <Link href="https://www.linkedin.com/in/nirmal-scaria/" className="underline">Nirmal Scaria</Link>.</div>
        <div>Source code on <Link href="https://github.com/NirmalScaria/bindle-ui" className="underline">GitHub</Link></div>
    </div>
}