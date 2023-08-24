import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const AssemblyIf: NodePrinter<AST.AssemblyIf> = {
  print: ({ path, print }) => [
    'if ',
    path.call(print, 'condition'),
    ' ',
    path.call(print, 'body')
  ]
};
