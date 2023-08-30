import type { AST, NodePrinter } from '../types';

export const RevertStatement: NodePrinter<AST.RevertStatement> = {
  print: ({ path, print }) => ['revert ', path.call(print, 'revertCall'), ';']
};
