import { doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const { hardline, join } = doc.builders;

export const AssemblySwitch: NodePrinter<AST.AssemblySwitch> = {
  print: ({ path, print }) => [
    'switch ',
    path.call(print, 'expression'),
    hardline,
    join(hardline, path.map(print, 'cases'))
  ]
};
