import type { AST, NodePrinter } from '../types';

export const AssemblyMemberAccess: NodePrinter<AST.AssemblyMemberAccess> = {
  print: ({ path, print }) => [
    path.call(print, 'expression'),
    '.',
    path.call(print, 'memberName')
  ]
};
