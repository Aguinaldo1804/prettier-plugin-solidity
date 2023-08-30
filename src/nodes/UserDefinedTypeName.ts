import type { AST, NodePrinter } from '../types';

export const UserDefinedTypeName: NodePrinter<AST.UserDefinedTypeName> = {
  print: ({ node }) => node.namePath
};
