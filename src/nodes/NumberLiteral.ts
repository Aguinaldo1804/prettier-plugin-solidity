import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const NumberLiteral: NodePrinter<AST.NumberLiteral> = {
  print: ({ node }) =>
    node.subdenomination
      ? [node.number, ' ', node.subdenomination]
      : node.number
};
