import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

export const AssemblyCase: NodePrinter = {
  print: ({ node, path, print }) => [
    (node as AST.AssemblyCase).default
      ? 'default'
      : ['case ', path.call(print, 'value')],
    ' ',
    path.call(print, 'block')
  ]
};
