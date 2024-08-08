// Takes a component and returns the necessary parameters to create a sandpack.

import { Component, DependancyItem } from "@/models/component";
import { getAppSS } from "firebase-nextjs/server/auth";
import { decodeImports } from "@/lib/decodeImports";

export async function parseComponent({ component }: { component: Component }) {
    const app = await getAppSS();
    const db = app.firestore();
    var relativeImports: string[] = [];
    var remoteDependencies: DependancyItem[] = [];
    var relativeImportLocations: any = {};
    var filesToAdd: any = {}
    var tailwindAdditionalConfig: any = {}

    await parseTree({ currentComponent: component });
    await decodeLocations();

    var importDeclarations = ""
    for (const exportItem of component.exports) {
        importDeclarations += `import { ${exportItem} } from "./${component.location}"\n`
    }
    filesToAdd["/App.tsx"] = importDeclarations + appCode;
    filesToAdd["/tailwind.config.ts"] = `tailwind.config = ` + JSON.stringify({ ...twconig, ...tailwindAdditionalConfig }, null, 2);

    var dependencies: any = {
        "tailwindcss": "latest",
        "tailwindcss-animate": "latest"
    }

    for (const remoteDependancy of remoteDependencies) {
        dependencies[remoteDependancy.name] = remoteDependancy.version;
    }

    filesToAdd = { ...defaultFiles, ...filesToAdd };

    return {
        filesToAdd,
        dependencies
    }
    async function parseTree({ currentComponent }: { currentComponent: Component }) {
        filesToAdd[currentComponent.location] = currentComponent.content;
        relativeImportLocations[currentComponent.id] = currentComponent.location;
        if (currentComponent.tailwindConfig != "") {
            const additionalConfig = JSON.parse(currentComponent.tailwindConfig);
            if (additionalConfig) {
                tailwindAdditionalConfig = { ...tailwindAdditionalConfig, ...additionalConfig };
            }
        }
        if (currentComponent.relativeImports.length > 0) {
            for (const relativeImport of currentComponent.relativeImports) {
                if (relativeImports.includes(relativeImport)) return;
                const ref = db.collection('Components').doc(relativeImport);
                const nextComponent: Component = (await ref.get()).data() as Component;
                await parseTree({ currentComponent: nextComponent });
            }
        }
        if (currentComponent.remoteDependancies.length > 0) {
            for (const remoteDependancy of currentComponent.remoteDependancies) {
                if (remoteDependencies.includes(remoteDependancy)) return;
                remoteDependencies.push(remoteDependancy);
            };
        }
    }
    async function decodeLocations() {
        for (const [key, value] of Object.entries(filesToAdd)) {
            filesToAdd[key] = await decodeImports({ sourceCode: value as string, replacements: relativeImportLocations, currentLocation: key });
        }
    }
}


var appCode = `import "./tailwind.config.ts";
export default function App() {
  return (
    <div className="flex flex-col items-center justify-center p-4 h-screen text-center">
      Your components have been imported. <br/>
      Edit the code to try them out.
    </div>
  )
}`

const twconig = {
    darkMode: ["class"],
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    prefix: "",
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
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }

const stylesText = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 45 100% 100%;
    --foreground: 0 0% 0%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 45 100% 0%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}

body {
  color: rgb(var(--foreground-rgb));
}`

const defaultFiles: any = {
    "/styles.css": stylesText,
    "/public/index.html": `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
  <div id="root"></div>
  </body>
  </html>`,
  }