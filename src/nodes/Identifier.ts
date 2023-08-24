import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const Identifier: NodePrinter<AST.Identifier> = {
  print: ({ node }) => node.name
};
