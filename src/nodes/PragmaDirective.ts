import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

export const PragmaDirective: NodePrinter = {
  print: ({ node }) => [
    'pragma ',
    (node as AST.PragmaDirective).name,
    ' ',
    (node as AST.PragmaDirective).value,
    ';'
  ]
};
