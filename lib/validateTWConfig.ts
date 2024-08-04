"use server";
import type { Config } from "tailwindcss"
export default async function validateTWConfig({ config }: { config: string }) {
    const errors: string[] = [];
    var configJSON;
    try {
        configJSON = JSON.parse(config == "" ? "{}" : config);
        if (typeof configJSON !== "object") {
            errors.push("Invalid JSON");
        }
        // TODO: Validate config
    }
    catch (e) {
        errors.push("Invalid JSON. Make sure the config is a valid JSON object.");
        console.log(e)
    }
    return errors;
}