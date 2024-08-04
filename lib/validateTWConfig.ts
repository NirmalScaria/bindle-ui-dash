"use server";
import type { Config } from "tailwindcss"
export default async function validateTWConfig({ config }: { config: string }) {
    const errors: string[] = [];
    var configJSON;
    try {
        configJSON = JSON.parse(config);
        if (typeof configJSON !== "object") {
            errors.push("Invalid JSON");
        }
        // try to satisfy Config
        const tailwindConfig = configJSON as Config;
        
    }
    catch (e) {
        errors.push("Invalid JSON");
    }
    return errors;
}