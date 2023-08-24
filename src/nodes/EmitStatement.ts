import type { NodePrinter } from '../prettier-plugin-solidity';

export const EmitStatement: NodePrinter = {
  print: ({ path, print }) => ['emit ', path.call(print, 'eventCall'), ';']
};
