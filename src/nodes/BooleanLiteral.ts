import type { AST, NodePrinter } from '../types';

export const BooleanLiteral: NodePrinter<AST.BooleanLiteral> = {
  print: ({ node }) => (node.value ? 'true' : 'false')
};
