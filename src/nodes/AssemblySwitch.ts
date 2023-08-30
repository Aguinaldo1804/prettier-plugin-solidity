import { doc } from 'prettier';
import type { AST, NodePrinter } from '../types';

const { hardline, join } = doc.builders;

export const AssemblySwitch: NodePrinter<AST.AssemblySwitch> = {
  print: ({ path, print }) => [
    'switch ',
    path.call(print, 'expression'),
    hardline,
    join(hardline, path.map(print, 'cases'))
  ]
};
