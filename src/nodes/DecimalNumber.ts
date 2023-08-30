import type { AST, NodePrinter } from '../types';

export const DecimalNumber: NodePrinter<AST.DecimalNumber> = {
  print: ({ node }) => node.value
};
