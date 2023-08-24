import type { NodePrinter } from '../prettier-plugin-solidity';

export const ContinueStatement: NodePrinter = {
  print: () => 'continue;'
};
