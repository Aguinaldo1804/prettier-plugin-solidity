import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

export const TypeDefinition: NodePrinter = {
  print: ({ node }) => [
    'type ',
    (node as AST.TypeDefinition).name,
    ' is ',
    (node as AST.TypeDefinition).definition.name,
    ';'
  ]
};
