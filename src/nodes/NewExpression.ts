import type { AST, NodePrinter } from '../types';

export const NewExpression: NodePrinter<AST.NewExpression> = {
  print: ({ path, print }) => ['new ', path.call(print, 'typeName')]
};
