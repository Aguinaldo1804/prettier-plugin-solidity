import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const AssemblyMemberAccess: NodePrinter<AST.AssemblyMemberAccess> = {
  print: ({ path, print }) => [
    path.call(print, 'expression'),
    '.',
    path.call(print, 'memberName')
  ]
};
