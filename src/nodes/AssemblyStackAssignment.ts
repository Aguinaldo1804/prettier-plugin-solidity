import type { AST, NodePrinter } from '../types';

export const AssemblyStackAssignment: NodePrinter<AST.AssemblyStackAssignment> =
  {
    print: ({ node, path, print }) => [
      path.call(print, 'expression'),
      ' =: ',
      node.name
    ]
  };
