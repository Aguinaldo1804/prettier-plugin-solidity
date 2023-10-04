import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const DecimalNumber: NodePrinter<AST.DecimalNumber> = {
  print: ({ node }) => node.value
};
