import type { AST, NodePrinter } from '../types';

export const IndexRangeAccess: NodePrinter<AST.IndexRangeAccess> = {
  print: ({ node, path, print }) => [
    path.call(print, 'base'),
    '[',
    node.indexStart ? path.call(print, 'indexStart') : '',
    ':',
    node.indexEnd ? path.call(print, 'indexEnd') : '',
    ']'
  ]
};
