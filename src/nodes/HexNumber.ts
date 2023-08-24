import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const HexNumber: NodePrinter<AST.HexNumber> = {
  print: ({ node }) => node.value
};
