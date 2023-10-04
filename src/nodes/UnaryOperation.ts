import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const UnaryOperation: NodePrinter<AST.UnaryOperation> = {
  print: ({ node, path, print }) =>
    node.isPrefix
      ? [
          node.operator,
          node.operator === 'delete' ? ' ' : '',
          path.call(print, 'subExpression')
        ]
      : [path.call(print, 'subExpression'), node.operator]
};
