import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const RevertStatement: NodePrinter<AST.RevertStatement> = {
  print: ({ path, print }) => ['revert ', path.call(print, 'revertCall'), ';']
};
