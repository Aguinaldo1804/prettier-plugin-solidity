import type { AST, NodePrinter } from '../types';

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
