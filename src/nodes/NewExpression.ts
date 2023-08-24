import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const NewExpression: NodePrinter<AST.NewExpression> = {
  print: ({ path, print }) => ['new ', path.call(print, 'typeName')]
};
