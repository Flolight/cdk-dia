import * as cdk from "../src/cdk"
import * as path from "path"
import * as diagrams from "../src/diagram"
import * as graphviz from "../src/graphviz"

export class CdkDia {

    async generateDiagram(treeJsonPath: string, targetPath: string, cdkBasePath: string = require.resolve('cdk-dia/package.json'), collapse: boolean) {

        // Parse tree.json
        const cdkTree = cdk.TreeJsonLoader.load(path.isAbsolute(treeJsonPath) ? treeJsonPath : path.join(process.cwd(), treeJsonPath))

        // Generate Diagram
        const generator = new diagrams.AwsDiagramGenerator(new diagrams.AwsEdgeResolver(), new diagrams.AwsIconSupplier(`${cdkBasePath}`))
        const diagram = generator.generate(cdkTree, collapse)

        // Render diagram using Graphviz
        const renderer = new graphviz.Generator(diagram)

        return renderer.generatePng(`${targetPath}`)
    }
}

