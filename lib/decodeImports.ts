"use server";

export async function decodeImports({ sourceCode, replacements, currentLocation }: { sourceCode: string, replacements: any, currentLocation: string }): Promise<string> {
    // Regex to match any string enclosed in quotes (single, double, or backticks) and starts with @@
    const stringPattern = /(['"`])(@@[\s\S]*?)\1/g;

    // Replace all matches
    const result = sourceCode.replace(stringPattern, (match, quote, str) => {
        // Check if the replacement exists in the map
        const rawString = str.slice(3);
        const replacement = replacements[rawString];
        if (replacement !== undefined) {
            // replacement string contains the location of a target file.
            // We need to convert this to a relative path from the current file
            // find the level of nesting of the current file
            const currentLocationParts = currentLocation.split('/');
            // add a ../ for each part in the current location
            const relativePath = '../'.repeat(currentLocationParts.length - 1);
            // add the replacement to the relative path
            return `${quote}${relativePath}${replacement}${quote}`;
        }
        // If no replacement found, return the original match
        return match;
    });

    return result;
}


