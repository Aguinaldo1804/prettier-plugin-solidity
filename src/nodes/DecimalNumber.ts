import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

export const DecimalNumber: NodePrinter = {
  print: ({ node }) => (node as AST.DecimalNumber).value
};
