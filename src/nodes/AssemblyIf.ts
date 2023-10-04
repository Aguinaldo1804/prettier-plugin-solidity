import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const AssemblyIf: NodePrinter<AST.AssemblyIf> = {
  print: ({ path, print }) => [
    'if ',
    path.call(print, 'condition'),
    ' ',
    path.call(print, 'body')
  ]
};
