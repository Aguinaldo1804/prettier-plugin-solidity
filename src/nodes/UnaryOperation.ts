import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

export const UnaryOperation: NodePrinter = {
  print: ({ node, path, print }) =>
    (node as AST.UnaryOperation).isPrefix
      ? [
          (node as AST.UnaryOperation).operator,
          (node as AST.UnaryOperation).operator === 'delete' ? ' ' : '',
          path.call(print, 'subExpression')
        ]
      : [
          path.call(print, 'subExpression'),
          (node as AST.UnaryOperation).operator
        ]
};
