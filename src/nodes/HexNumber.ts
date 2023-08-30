import type { AST, NodePrinter } from '../types';

export const HexNumber: NodePrinter<AST.HexNumber> = {
  print: ({ node }) => node.value
};
