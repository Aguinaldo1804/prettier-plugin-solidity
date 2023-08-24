import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const AssemblyCase: NodePrinter<AST.AssemblyCase> = {
  print: ({ node, path, print }) => [
    node.default ? 'default' : ['case ', path.call(print, 'value')],
    ' ',
    path.call(print, 'block')
  ]
};
