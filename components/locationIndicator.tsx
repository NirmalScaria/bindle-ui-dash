"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";


export default function LocationIndicator() {
  const path = usePathname()
  var locationParts = path.split(/[/.]+/).filter(part => part !== "")
  locationParts = locationParts.map(part => part[0].toUpperCase() + part.slice(1))
  return <Breadcrumb>
    <BreadcrumbList>

      {
        locationParts.slice(0, -1).map((part, index) => {
          return <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink>{part}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        })
      }
      <BreadcrumbItem>
        <BreadcrumbPage>{locationParts[locationParts.length - 1]}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>

}