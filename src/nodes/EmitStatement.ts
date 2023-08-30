import type { AST, NodePrinter } from '../types';

export const EmitStatement: NodePrinter<AST.EmitStatement> = {
  print: ({ path, print }) => ['emit ', path.call(print, 'eventCall'), ';']
};
