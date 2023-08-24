import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const EmitStatement: NodePrinter<AST.EmitStatement> = {
  print: ({ path, print }) => ['emit ', path.call(print, 'eventCall'), ';']
};
