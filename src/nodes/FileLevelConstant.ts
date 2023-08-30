import type { AST, NodePrinter } from '../types';

export const FileLevelConstant: NodePrinter<AST.FileLevelConstant> = {
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    ' constant ',
    node.name,
    ' = ',
    path.call(print, 'initialValue'),
    ';'
  ]
};
