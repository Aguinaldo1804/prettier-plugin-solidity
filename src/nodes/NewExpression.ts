import type { NodePrinter } from '../prettier-plugin-solidity';

export const NewExpression: NodePrinter = {
  print: ({ path, print }) => ['new ', path.call(print, 'typeName')]
};
