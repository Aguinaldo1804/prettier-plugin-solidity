import type { NodePrinter } from '../prettier-plugin-solidity';

export const NameValueExpression: NodePrinter = {
  print: ({ path, print }) => [
    path.call(print, 'expression'),
    '{',
    path.call(print, 'arguments'),
    '}'
  ]
};
