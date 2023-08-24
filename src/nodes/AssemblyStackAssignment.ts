import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

export const AssemblyStackAssignment: NodePrinter = {
  print: ({ node, path, print }) => [
    path.call(print, 'expression'),
    ' =: ',
    (node as AST.AssemblyStackAssignment).name
  ]
};
