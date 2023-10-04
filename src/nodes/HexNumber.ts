import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const HexNumber: NodePrinter<AST.HexNumber> = {
  print: ({ node }) => node.value
};
