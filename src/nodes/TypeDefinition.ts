import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const TypeDefinition: NodePrinter<AST.TypeDefinition> = {
  print: ({ node }) => ['type ', node.name, ' is ', node.definition.name, ';']
};
