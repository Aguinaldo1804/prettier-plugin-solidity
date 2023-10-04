import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const BreakStatement: NodePrinter<AST.BreakStatement> = {
  print: () => 'break;'
};
