import type { NodePrinter } from '../prettier-plugin-solidity';

export const AssemblyIf: NodePrinter = {
  print: ({ path, print }) => [
    'if ',
    path.call(print, 'condition'),
    ' ',
    path.call(print, 'body')
  ]
};
