import { doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const { join } = doc.builders;

export const AssemblyFor: NodePrinter<AST.AssemblyFor> = {
  print: ({ path, print }) =>
    join(' ', [
      'for',
      path.call(print, 'pre'),
      path.call(print, 'condition'),
      path.call(print, 'post'),
      path.call(print, 'body')
    ])
};
