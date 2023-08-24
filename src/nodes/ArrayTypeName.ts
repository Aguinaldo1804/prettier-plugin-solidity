import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

export const ArrayTypeName: NodePrinter = {
  print: ({ node, path, print }) => [
    path.call(print, 'baseTypeName'),
    '[',
    (node as AST.ArrayTypeName).length ? path.call(print, 'length') : '',
    ']'
  ]
};
