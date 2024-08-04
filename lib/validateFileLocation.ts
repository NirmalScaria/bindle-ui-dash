"use server";

export default async function validateFileLocation({ location }: { location: string }) {
    const errors: string[] = [];
    if (location === "") {
        errors.push("Location cannot be empty");
    }
    if (!location.startsWith("components/") && !location.startsWith("lib/")) {
        errors.push("Location must start with 'components/' or 'lib/'");
    }
    if (!location.endsWith(".ts") && !location.endsWith(".tsx")) {
        errors.push("File must have extension '.ts' or '.tsx'");
    }
    return errors;
}