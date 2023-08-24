import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const EnumValue: NodePrinter<AST.EnumValue> = {
  print: ({ node }) => node.name
};
