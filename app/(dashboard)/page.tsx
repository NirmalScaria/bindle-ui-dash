import LearnTile from "@/components/learnTile";
import { BorderBeam } from "@/components/magicui/border-beam";
import { MagicCard } from "@/components/magicui/magic-card";
import TopBar from "@/components/topbar";
import { cn } from "@/lib/utils";
import { ChevronRight, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { ReactNode } from "react";
import { BsGithub } from "react-icons/bs";
import { CgNpm } from "react-icons/cg";

const poppins = Poppins({ weight: ["300", "400", "500", "600"], subsets: ['latin'] });

const features = [
  {
    name: '⚡️ Quick Setup!',
    title: 'Add components in seconds',
    description: 'With the npx script from bindle-ui, you can add components to your project without worrying about complex setup processes.'
  },
  {
    name: '🔒 Collaborative',
    title: 'Share your components',
    description: 'Explore components created by other developers. Collaborate and build amazing projects together.'
  },
  {
    name: '🎨 Fully Customizable!',
    title: 'Customize components',
    description: 'Customize the components to match your app’s design. Change colors, fonts, and more with ease.'
  }
]


export default async function Home() {

  return (
    <main className="bg-[#031525] flex flex-col pb-10 p-4 md:p-8 items-center">
      <TopBar />
      <div className="max-w-[60rem] py-2 md:py-6 flex flex-col">
        <div className="h-[80vh] flex flex-col items-center w-full justify-center">
          <h1 className={cn("text-sm font-medium bg-gradient-to-tl from-[#c278ba]  to-[#ae58a4] text-white px-4 py-1 rounded-full border border-white/40 mb-2", poppins.className)}>bindle-ui</h1>
          <p className={cn("text-white font-bold text-2xl md:text-5xl max-w-[60rem] text-center mb-3", poppins.className)}>A truly collaborative <br/>design mega-library</p>
          <p className={cn("text-white/70 font-thin text-md md:text-xl max-w-[55rem] text-center", poppins.className)}>Bindle is a library of design libraries. Bindle is libraryception.</p>
          <div className="flex flex-row gap-2 mt-4">
            <LinkItem className="flex md:hidden" href='https://github.com/NirmalScaria/bindle-ui' text='GitHub' image={<BsGithub size={16} />} big={true} />
            <LinkItem className="flex md:hidden" href='https://npmjs.com/package/bindle-ui' text='NPM' image={<CgNpm size={16} />} big={true} />
            <LinkItem className="hidden md:flex" href='https://github.com/NirmalScaria/bindle-ui' text='Github' image={<div className="flex flex-row gap-1"><Star size={18} className="group-hover:fill-white transition-all" /></div>} primary={false} big={true} />
            <LinkItem href='/install' text='Components' image={<ChevronRight size={18} />} primary={true} big={true} />
          </div>
        </div>

      </div>
      <div className="min-h-[40vh] py-2 md:py-6 flex flex-col">
        <h2 className={cn("text-2xl md:text-4xl font-medium text-white mb-6 mx-1", poppins.className)}>Why Choose bindle-ui?</h2>
        <div className="flex flex-col md:flex-row gap-2 overflow-hidden">
          {
            features.map((feature, i) => <Feature key={i} title={feature.title} description={feature.description} name={feature.name} />)
          }
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2 w-full">
        <h2 className={cn("text-2xl md:text-4xl font-medium text-white mb-6 mx-1", poppins.className)}>Learn More</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {learnItems.map((leartnItem) => <LearnTile key={leartnItem.title} {...leartnItem} />)}
        </div>
      </div>
    </main>
  );
}

function Feature({ title, description, name }: { title: string, description: string, name: string }) {
  return (
    <div className="w-full rounded-md relative">
      <BorderBeam />
      <MagicCard gradientColor="#ffffff10" className={
        cn("flex flex-col w-full h-full p-4 bg-transparent border-white/15 rounded-md border cursor-default", poppins.className)
      }>
        <h2 className="text-white font-semibold text-2xl mb-2">{name}</h2>
        <h3 className="text-white/70 font-medium text-lg mb-2">{title}</h3>
        <p className="text-white/60 text-sm">{description}</p>
      </MagicCard>
    </div>
  )
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

const learnItems = [
  {
    title: "Installation",
    description: "This will guide you through the setup to get bindle-ui up and running.",
    href: "/install"
  },
  {
    title: "Custom Routing",
    description: "Learn how to configure the rules for which routes are accessible to which users.",
    href: "/routing"
  },
  {
    title: "Authentication",
    description: "Learn how to manage the authentication state of users on client side and server side.",
    href: "/auth"
  },
  {
    title: "Customise Login Pages",
    description: "Learn how to customise the login pages to match your app's design.",
    href: "/custom_login"
  },
  {
    title: "Moving to Production",
    description: "Learn how to setup the project to be production ready.",
    href: "/production"
  },
  {
    title: "Components",
    description: "Learn about the pre-built components that come with bindle-ui.",
    href: "/components"
  }
]