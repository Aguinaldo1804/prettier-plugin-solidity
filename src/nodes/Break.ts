import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const Break: NodePrinter<AST.Break> = {
  print: () => 'break'
};
