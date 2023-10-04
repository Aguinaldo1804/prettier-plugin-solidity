import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const BooleanLiteral: NodePrinter<AST.BooleanLiteral> = {
  print: ({ node }) => (node.value ? 'true' : 'false')
};
