import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export default function Layout({ children }: { children: React.ReactNode }) {
    return <body className={cn(inter.className)}>

        {children}

        <Toaster />
    </body>
}