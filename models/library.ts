import { Contributor } from "./contributor";

export interface Library {
    name?: string;
    id: string;
    owner?: Contributor;
    ownerId: string;
    status: "private" | "public";
    components?: string[];
}