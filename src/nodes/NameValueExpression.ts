import type { AST, NodePrinter } from '../types';

export const NameValueExpression: NodePrinter<AST.NameValueExpression> = {
  print: ({ path, print }) => [
    path.call(print, 'expression'),
    '{',
    path.call(print, 'arguments'),
    '}'
  ]
};
