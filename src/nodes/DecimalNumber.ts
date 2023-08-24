import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const DecimalNumber: NodePrinter<AST.DecimalNumber> = {
  print: ({ node }) => node.value
};
