import type { AST, NodePrinter } from '../types';

export const ContinueStatement: NodePrinter<AST.ContinueStatement> = {
  print: () => 'continue;'
};
