import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const NameValueExpression: NodePrinter<AST.NameValueExpression> = {
  print: ({ path, print }) => [
    path.call(print, 'expression'),
    '{',
    path.call(print, 'arguments'),
    '}'
  ]
};
