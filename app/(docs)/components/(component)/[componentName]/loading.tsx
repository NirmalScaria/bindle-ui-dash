import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Loading() {
    return <div className="flex flex-col m-5 gap-4 z-10">
        <Breadcrumb>
            <BreadcrumbList>

                <BreadcrumbItem>
                    <BreadcrumbLink>Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <Skeleton className="w-20 h-6" />
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <Skeleton className="w-40 h-10" />
        <Skeleton className="w-80 h-6" />
        <div className="flex flex-col w-full">
            <div className="flex flex-row mb-5 border-b">
                <button className={cn("p-2 text-sm", "border-b-2 border-b-black")}>Preview</button>
                <button className={cn("p-2 text-sm", "")}>Code</button>
            </div>
        </div>
        <Skeleton className="w-full h-96 mb-20" />
    </div>
}