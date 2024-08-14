import { Description, Heading, Heading3 } from "@/components/design/Texts";
import MyCode from "@/components/myCode";
import { cn } from "@/lib/utils";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({ weight: "400", subsets: ["latin"] });

export default async function Installationpage() {
  return <div className="flex flex-col gap-6 mb-10">
    <div className="flex flex-col gap-2">
      <Heading>How to Contribute?</Heading>
      <Description>Contributing to Bindle-UI is surprisingly easy.</Description>
      <hr className="" />
    </div>
    <Heading3>Publishing a Component</Heading3>
    <div className={cn("flex-col gap-6 border-l ml-5 pl-10 flex")}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3 -left-[3.75rem] relative">
          <div className="rounded-full bg-gray-100 border-4 border-white h-10 w-10 flex flex-row items-center justify-center font-semibold">1</div>
          <p className="font-semibold">Add the Component Id and Code.</p>
        </div>
        <span className="text-gray-700">The component id is a unique id for every component in bindle. The users use this id in the CLI to install the component.</span>
        <span className="text-gray-700">The code should correspond to exactly one file which will be copied to the user&apos;s project. Once the code is submitted, it will be automatically analysed to find the imports and exports.</span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3 -left-[3.75rem] relative">
          <div className="rounded-full bg-gray-100 border-4 border-white h-10 w-10 flex flex-row items-center justify-center font-semibold">2</div>
          <p className="font-semibold">Manage imports</p>
        </div>
        <span className="text-gray-700">You might want to use external NPM packages as well as other local/relative imports in your code. These two are handled separately. If you do not have imports, skip this.</span>
        <span className="font-semibold">NPM Imports</span>
        <span className="text-gray-700">NPM Imports are automatically detected from the code!</span>
        <MyCode code={`import { PlusCircle } from "lucide-react"`} showLineNumbers={false} />
        <span className="text-gray-700">Bindle will understand that the above line is an NPM import and add it to the packages.json auatomatically.</span>
        <span className="font-semibold">Relative Imports</span>
        <span className="text-gray-700">This refers to functions or components that you might want to import from other files. One common example is the <span className={robotoMono.className}>cn(...)</span> function for merging class names.</span>
        <MyCode code={`import { cn } from "@/lib/utils"`} showLineNumbers={false} />
        <span className="text-gray-700">This cannot work because user might not have lib/utils on their project. Instead, you can use a special expression to import the file from bindle itself.</span>
        <MyCode code={`import { cn } from "@@/utils"`} showLineNumbers={false} />
        <span className="text-gray-700">Use the @@ expression as above and the component or function with id utils will be copied from bindle-ui. For the special case of cn, the cn function and utils file already exist on bindle-ui and you can readily import it as above.</span>
        <span className="text-gray-700">If you want to import a new function or component in your component, publish the independant component on bindle first and then import that component using <span className={robotoMono.className}>@@componentId.</span></span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3 -left-[3.75rem] relative">
          <div className="rounded-full bg-gray-100 border-4 border-white h-10 w-10 flex flex-row items-center justify-center font-semibold">3</div>
          <p className="font-semibold">Determine file location and name</p>
        </div>
        <span className="text-gray-700">This is the location in the user project directory that the file will be copied to. The location must be either under /components (generally for UI components) or under /lib (for utilities and functions). The files should be of .ts or .tsx format.</span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3 -left-[3.75rem] relative">
          <div className="rounded-full bg-gray-100 border-4 border-white h-10 w-10 flex flex-row items-center justify-center font-semibold">3</div>
          <p className="font-semibold">Add documentation and Publish</p>
        </div>
        <span className="text-gray-700">Be sure to include examples and basic usage code in the documentation. Bindle-UI uses codesandbox and it significantly reduces the effort required to create examples and demos.</span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3 -left-[3.75rem] relative">
          <div className="rounded-full bg-gray-100 border-4 border-white h-10 w-10 flex flex-row items-center justify-center font-semibold">4</div>
          <p className="font-semibold">Share the news!</p>
        </div>
      </div>
    </div>
  </div >
}

const tailwindConfigCode = `const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: \`var(--radius)\`,
        md: \`calc(var(--radius) - 2px)\`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
`

const globalCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;

    --ring: 215 20.2% 65.1%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;

    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;

    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;

    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;

    --border: 216 34% 17%;
    --input: 216 34% 17%;

    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;

    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --ring: 216 34% 17%;

    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
`