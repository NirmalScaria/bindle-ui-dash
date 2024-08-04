"use server";

import { ImportVersion } from "@/app/contribute/new-component/page";

const versionRegexPattern = "^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$";

export default async function validateVersions({ versions }: { versions: ImportVersion[] }) {
    const errors: string[] = [];
    // TODO: Implement version validation
    // const versionRegex = new RegExp(versionRegexPattern);
    // versions.forEach(version => {
    //     if (!versionRegex.test(version.version)) {
    //         errors.push(`Invalid version for ${version.name}`);
    //     }
    // });
    // console.log(errors)
    return errors;
}