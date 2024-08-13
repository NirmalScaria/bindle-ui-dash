"use server";
import * as ts from 'typescript';

export async function analyseCodeOnServer(sourceCode: string) {
    // Parse the source code to create a SourceFile (AST representation)
    const sourceFile = ts.createSourceFile('temp.ts', sourceCode, ts.ScriptTarget.ESNext, true);

    // Containers for results
    const imports: string[] = [];
    const exports: string[] = [];

    // Helper function to collect information
    function visit(node: ts.Node) {
        // Check for import declarations
        if (ts.isImportDeclaration(node)) {
            const moduleSpecifier = (node.moduleSpecifier as ts.StringLiteral).text;
            imports.push(moduleSpecifier);
        }

        // Check for export declarations
        if (
            ts.isExportAssignment(node) ||
            ts.isExportDeclaration(node)
        ) {
            if (ts.isExportDeclaration(node) && node.exportClause) {
                // Export with aliases or specific exports
                const exportClause = node.exportClause;
                if (ts.isNamedExports(exportClause)) {
                    exportClause.elements.forEach(specifier => {
                        if (specifier.propertyName) {
                            exports.push(`${specifier.propertyName.text} as ${specifier.name.text}`);
                        } else {
                            exports.push(specifier.name.text);
                        }
                    });
                }
            } else if (ts.isExportDeclaration(node) && !node.exportClause) {
                // Export all
                const moduleSpecifier = node.moduleSpecifier as ts.StringLiteral;
                exports.push(`* from ${moduleSpecifier.text}`);
            }
        }

        // Check for inline exports (export const, export function, export class, export interface, export type, export enum)
        if (
            ts.isVariableStatement(node) &&
            node.modifiers &&
            node.modifiers.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)
        ) {
            node.declarationList.declarations.forEach(declaration => {
                if (ts.isIdentifier(declaration.name)) {
                    exports.push(declaration.name.text);
                }
            });
        }

        if (
            (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isEnumDeclaration(node)) &&
            node.modifiers &&
            node.modifiers.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)
        ) {
            if (node.name && ts.isIdentifier(node.name)) {
                exports.push(node.name.text);
            }
        }

        // Handle default exports (export default)
        if (
            (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) &&
            node.modifiers &&
            node.modifiers.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) &&
            node.modifiers.some(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword)
        ) {
            if (node.name && ts.isIdentifier(node.name)) {
                exports.push('default ' + node.name.text);
            } else {
                exports.push('default anonymous function/class');
            }
        }

        // Visit each child node recursively
        ts.forEachChild(node, visit);
    }

    // Start the AST traversal
    visit(sourceFile);

    const remoteImports = new Set<string>();
    const localImports = new Set<string>();
    const relativeImports = new Set<string>();

    imports.forEach(dep => {
        if (dep.startsWith("@@/")) {
            relativeImports.add(dep.slice(3));
            return;
        }
        if (dep.startsWith('@/') || dep.startsWith('./') || dep.startsWith('../') || dep.startsWith('/')) {
            localImports.add(dep);
            return;
        }
        if (dep.startsWith('@')) {
            remoteImports.add(dep.split('/')[0] + '/' + dep.split('/')[1]);
            return;
        }
        remoteImports.add(dep.split('/')[0]);
    });

    // Convert the Set to Array
    const remoteImportsArray = Array.from(remoteImports);
    const localImportsArray = Array.from(localImports);

    return {
        remoteImports: remoteImportsArray,
        localImports: localImportsArray,
        exports,
        relativeImports: Array.from(relativeImports)
    };
}
