import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const Identifier: NodePrinter<AST.Identifier> = {
  print: ({ node }) => node.name
};
