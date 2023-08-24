import type { NodePrinter } from '../prettier-plugin-solidity';

export const ThrowStatement: NodePrinter = {
  print: () => 'throw;'
};
