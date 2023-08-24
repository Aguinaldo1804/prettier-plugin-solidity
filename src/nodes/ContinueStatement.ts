import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const ContinueStatement: NodePrinter<AST.ContinueStatement> = {
  print: () => 'continue;'
};
