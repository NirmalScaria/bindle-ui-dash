"use client";
import { cn } from "@/lib/utils";
import { getUserCS } from "firebase-nextjs/client/auth";
import { ProfileButton } from "firebase-nextjs/client/components";
import Link from "next/link";
import { ReactNode } from "react";
import { BsGithub } from "react-icons/bs";
import { CgNpm } from "react-icons/cg";

export default function ContributeTopBarOld() {
  const { currentUser: user } = getUserCS();
  return <div className="flex flex-row w-full justify-between items-center mb-4">
    <div className="flex flex-row gap-2">
      <div className="md:flex flex-row gap-2 hidden">
        <LinkItem href='https://github.com/NirmalScaria/bindle-ui' text='GitHub' image={<BsGithub size={16} />} />
        <LinkItem href='https://npmjs.com/package/bindle-ui' text='NPM' image={<CgNpm size={16} />} />
      </div>
    </div>
    <ProfileButton />
  </div>
}

function LinkItem({ href, image, text, primary = false, big = false, className }: { href: string, text: string, image: ReactNode, primary?: boolean, big?: boolean, className?: string }) {
  return (
    <Link href={href} className={
      cn(
        "flex flex-row text-sm gap-2 items-center text-white/80 font-medium rounded-md border border-white/30 transition-all group",
        primary ? "bg-white hover:bg-white/90 text-black" : "hover:bg-white/10",
        big ? "p-2 px-4 " : "p-1 px-3 ",
        className
      )
    }>
      <span>{text}</span>
      {image}
    </Link>);
}