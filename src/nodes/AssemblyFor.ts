import { doc } from 'prettier';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

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
