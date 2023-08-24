import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

export const NumberLiteral: NodePrinter = {
  print: ({ node }) =>
    (node as AST.NumberLiteral).subdenomination
      ? [
          (node as AST.NumberLiteral).number,
          ' ',
          (node as AST.NumberLiteral).subdenomination!
        ]
      : (node as AST.NumberLiteral).number
};
