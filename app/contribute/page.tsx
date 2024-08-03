import { BookAIcon, Component, Library, User2 } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { MdAddBox } from "react-icons/md";

interface MainLink {
    title: string;
    description: string;
    icon: ReactNode;
    href: string;
}

const mainLinks = [
    {
        title: "New Library",
        description: "Create and publish a new library to the Bindle ecosystem.",
        icon: <Library size={40} />,
        href: "/contribute/new-library"
    },
    {
        title: "New Component",
        description: "Create and publish a new individual component to the Bindle ecosystem.",
        icon: <MdAddBox size={40} />,
        href: "/contribute/new-component"
    },
    {
        title: "My Libraries",
        description: "Manage your libraries and components. Add new components to existing libraries.",
        icon: <BookAIcon size={40} />,
        href: "/contribute/my-libraries"
    },
    {
        title: "My Components",
        description: "Manage your individual components. Edit, delete, or add new versions.",
        icon: <Component size={40} />,
        href: "/contribute/my-components"
    },
    {
        title: "My Account",
        description: "Manage your account settings. Change your password, email, or delete your account.",
        icon: <User2 size={40} />,
        href: "/contribute/my-account"
    }
]

export default function ContributePage() {
    return <div className="flex flex-col h-full justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-6">
            {
                mainLinks.map((link, i) => <MainLink key={i} link={link} />)
            }
        </div>
    </div>
}

function MainLink({ link }: { link: MainLink }) {
    return (
        <Link href={link.href} className="w-full rounded-md border border-white/20 relative p-4 min-h-[200px] flex flex-col hover:bg-white/5 transition-all">
            <div className="h-full w-full justify-center flex flex-row pt-10 pb-6 mb-3">{link.icon}</div>
            <h2 className="text-white font-semibold text-xl mb-1">{link.title}</h2>
            <p className="text-white/60 text-sm">{link.description}</p>
        </Link>
    )
}