import type { AST, NodePrinter } from '../types';

export const TypeDefinition: NodePrinter<AST.TypeDefinition> = {
  print: ({ node }) => ['type ', node.name, ' is ', node.definition.name, ';']
};
