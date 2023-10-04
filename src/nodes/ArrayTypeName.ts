import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const ArrayTypeName: NodePrinter<AST.ArrayTypeName> = {
  print: ({ node, path, print }) => [
    path.call(print, 'baseTypeName'),
    '[',
    node.length ? path.call(print, 'length') : '',
    ']'
  ]
};
