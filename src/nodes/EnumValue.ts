import type { AST, NodePrinter } from '../types';

export const EnumValue: NodePrinter<AST.EnumValue> = {
  print: ({ node }) => node.name
};
