import type { NodePrinter } from '../prettier-plugin-solidity';

export const RevertStatement: NodePrinter = {
  print: ({ path, print }) => ['revert ', path.call(print, 'revertCall'), ';']
};
