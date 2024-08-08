import Link from "next/link";

export default function DocsFooter() {
    return <div className="flex flex-col md:flex-row p-3 border-t mt-3 w-full text-sm text-gray-500">
        Created by&nbsp; <Link href="https://www.linkedin.com/in/nirmal-scaria/" className="underline">Nirmal Scaria</Link>.
        Source code on &nbsp;<Link href="https://github.com/NirmalScaria/bindle-ui" className="underline">GitHub</Link>
    </div>
}