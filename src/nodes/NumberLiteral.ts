import type { AST, NodePrinter } from '../types';

export const NumberLiteral: NodePrinter<AST.NumberLiteral> = {
  print: ({ node }) =>
    node.subdenomination
      ? [node.number, ' ', node.subdenomination]
      : node.number
};
