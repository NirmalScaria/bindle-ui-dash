export interface DependancyItem {
    name: string;
    version: string;
}

export interface Component {
    id: string;
    uid?: string;
    location: string;
    content: string;
    owner: string | null;
    remoteDependancies: DependancyItem[];
    relativeImports: string[];
    tailwindConfig: string;
    exports: string[];
    status?: "component" | "documentation" | "published";
}

export interface PublishedComponent {
    id: string;
    uid?: string;
    location: string;
    content: string;
    owner: string | null;
    remoteDependancies: DependancyItem[];
    relativeImports: string[];
    tailwindConfig: string;
    exports: string[];
    status?: "component" | "documentation" | "published";
    name: string;
    description: string;
    mainDemo?: ComponentSample;
    installCommand: string;
    manualCode: string;
    usageSampleCode: string;
    examples: {name: string, code: ComponentSample}[];
    installCount: number
}

export interface ComponentSample {
    dependencies: { [key: string]: string };
    files: { [key: string]: string };
}