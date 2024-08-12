import { Component, PublishedComponent } from "./component";
import { Contributor } from "./contributor";

export interface Library {
    name?: string;
    id: string;
    ownerDetails: Contributor;
    owner: string;
    status: "private" | "public";
    components?: PublishedComponent[];
    drafts?: Component[];
}