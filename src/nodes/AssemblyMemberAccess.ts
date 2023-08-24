import type { NodePrinter } from '../prettier-plugin-solidity';

export const AssemblyMemberAccess: NodePrinter = {
  print: ({ path, print }) => [
    path.call(print, 'expression'),
    '.',
    path.call(print, 'memberName')
  ]
};
