import type { NodePrinter } from '../prettier-plugin-solidity';

export const Break: NodePrinter = {
  print: () => 'break'
};
