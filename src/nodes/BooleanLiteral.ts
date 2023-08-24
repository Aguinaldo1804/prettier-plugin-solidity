import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const BooleanLiteral: NodePrinter<AST.BooleanLiteral> = {
  print: ({ node }) => (node.value ? 'true' : 'false')
};
