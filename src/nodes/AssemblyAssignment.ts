import { doc } from 'prettier';
import type { AST, NodePrinter } from '../types';

const { join } = doc.builders;

export const AssemblyAssignment: NodePrinter<AST.AssemblyAssignment> = {
  print: ({ path, print }) => [
    join(', ', path.map(print, 'names')),
    ' := ',
    path.call(print, 'expression')
  ]
};
