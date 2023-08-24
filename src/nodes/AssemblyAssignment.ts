import { doc } from 'prettier';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { join } = doc.builders;

export const AssemblyAssignment: NodePrinter = {
  print: ({ path, print }) => [
    join(', ', path.map(print, 'names')),
    ' := ',
    path.call(print, 'expression')
  ]
};
