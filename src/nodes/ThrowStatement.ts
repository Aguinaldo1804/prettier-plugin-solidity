import type { AST, NodePrinter } from '../types';

export const ThrowStatement: NodePrinter<AST.ThrowStatement> = {
  print: () => 'throw;'
};
