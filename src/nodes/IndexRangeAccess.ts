import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

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
