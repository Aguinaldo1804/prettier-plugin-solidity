import type { AST, NodePrinter } from '../types';

export const AssemblyIf: NodePrinter<AST.AssemblyIf> = {
  print: ({ path, print }) => [
    'if ',
    path.call(print, 'condition'),
    ' ',
    path.call(print, 'body')
  ]
};
