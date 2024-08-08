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
    status?: string;
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
    status?: string;
    name: string;
    description: string;
    mainDemo?: ComponentSample;
    installCommand: string;
    manualCode: string;
    usageSampleCode: string;
    examples: { [key: string]: ComponentSample };
}

export interface ComponentSample {
    dependencies: { [key: string]: string };
    files: { [key: string]: string };
}