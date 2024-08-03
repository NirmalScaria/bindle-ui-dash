"use server";
import * as ts from 'typescript';

export async function analyseCodeOnServer(sourceCode: string) {
    // Parse the source code to create a SourceFile (AST representation)
    const sourceFile = ts.createSourceFile('temp.ts', sourceCode, ts.ScriptTarget.ESNext, true);

    // Containers for results
    var imports: string[] = [];
    const exports: string[] = [];

    // Helper function to collect information
    function visit(node: ts.Node) {
        // Check for import declarations
        if (ts.isImportDeclaration(node)) {
            const moduleSpecifier = (node.moduleSpecifier as ts.StringLiteral).text;
            imports.push(moduleSpecifier);
        }
        if (
            ts.isExportAssignment(node) ||
            ts.isExportDeclaration(node) ||
            ts.isExportSpecifier(node)
        ) {
            if (node.name?.getText()) {
                exports.push(node.name?.getText());
            }
        }

        // Check for inline exports (export const, export function, export class)
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
            (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) &&
            node.modifiers &&
            node.modifiers.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)
        ) {
            if (node.name && ts.isIdentifier(node.name)) {
                exports.push(node.name.text);
            }
        }
        // Visit each child node recursively
        ts.forEachChild(node, visit);
    }

    // Start the AST traversal
    visit(sourceFile);

    imports = imports.map(dep => {
        if (dep.startsWith('@')) {
            return dep.split('/')[0] + '/' + dep.split('/')[1];
        }
        return dep.split('/')[0];
    });

    // remove duplicates
    imports = imports.filter((value, index, self) => self.indexOf(value) === index);

    return { imports, exports };
}