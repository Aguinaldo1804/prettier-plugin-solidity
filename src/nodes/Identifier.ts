import type { AST, NodePrinter } from '../types';

export const Identifier: NodePrinter<AST.Identifier> = {
  print: ({ node }) => node.name
};
