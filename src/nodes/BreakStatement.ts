import type { NodePrinter } from '../prettier-plugin-solidity';

export const BreakStatement: NodePrinter = {
  print: () => 'break;'
};
