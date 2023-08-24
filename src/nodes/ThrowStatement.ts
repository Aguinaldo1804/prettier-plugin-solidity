import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const ThrowStatement: NodePrinter<AST.ThrowStatement> = {
  print: () => 'throw;'
};
