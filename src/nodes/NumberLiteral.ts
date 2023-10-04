import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const NumberLiteral: NodePrinter<AST.NumberLiteral> = {
  print: ({ node }) =>
    node.subdenomination
      ? [node.number, ' ', node.subdenomination]
      : node.number
};
