import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const AssemblyStackAssignment: NodePrinter<AST.AssemblyStackAssignment> =
  {
    print: ({ node, path, print }) => [
      path.call(print, 'expression'),
      ' =: ',
      node.name
    ]
  };
