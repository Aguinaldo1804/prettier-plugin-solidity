import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const TypeDefinition: NodePrinter<AST.TypeDefinition> = {
  print: ({ node }) => ['type ', node.name, ' is ', node.definition.name, ';']
};
