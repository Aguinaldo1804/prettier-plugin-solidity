import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const AssemblyStackAssignment: NodePrinter<AST.AssemblyStackAssignment> =
  {
    print: ({ node, path, print }) => [
      path.call(print, 'expression'),
      ' =: ',
      node.name
    ]
  };
