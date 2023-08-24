import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const UserDefinedTypeName: NodePrinter<AST.UserDefinedTypeName> = {
  print: ({ node }) => node.namePath
};
