import { doc } from 'prettier';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { hardline, join } = doc.builders;

export const AssemblySwitch: NodePrinter = {
  print: ({ path, print }) => [
    'switch ',
    path.call(print, 'expression'),
    hardline,
    join(hardline, path.map(print, 'cases'))
  ]
};
