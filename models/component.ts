export interface DependancyItem {
    name: string;
    version: string;
}

export interface Component {
    id: string;
    location: string;
    content: string;
    owner: string | null;
    remoteDependancies: DependancyItem[];
    relativeImports: string[];
    tailwindConfig: string;
}