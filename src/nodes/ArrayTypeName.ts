import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const ArrayTypeName: NodePrinter<AST.ArrayTypeName> = {
  print: ({ node, path, print }) => [
    path.call(print, 'baseTypeName'),
    '[',
    node.length ? path.call(print, 'length') : '',
    ']'
  ]
};
