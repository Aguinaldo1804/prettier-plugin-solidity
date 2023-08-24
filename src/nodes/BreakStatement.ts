import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const BreakStatement: NodePrinter<AST.BreakStatement> = {
  print: () => 'break;'
};
