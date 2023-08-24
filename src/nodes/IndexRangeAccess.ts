import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

export const IndexRangeAccess: NodePrinter = {
  print: ({ node, path, print }) => [
    path.call(print, 'base'),
    '[',
    (node as AST.IndexRangeAccess).indexStart
      ? path.call(print, 'indexStart')
      : '',
    ':',
    (node as AST.IndexRangeAccess).indexEnd ? path.call(print, 'indexEnd') : '',
    ']'
  ]
};
