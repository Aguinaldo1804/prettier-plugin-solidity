import type { AST, NodePrinter } from '../types';

export const BreakStatement: NodePrinter<AST.BreakStatement> = {
  print: () => 'break;'
};
