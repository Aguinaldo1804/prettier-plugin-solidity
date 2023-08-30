import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import type { AST, NodePrinter } from '../types';

const { hardline } = doc.builders;

export const StructDefinition: NodePrinter<AST.StructDefinition> = {
  print: ({ node, path, print }) => [
    'struct ',
    node.name,
    ' {',
    node.members.length > 0
      ? printSeparatedList(path.map(print, 'members'), {
          firstSeparator: hardline,
          separator: [';', hardline],
          lastSeparator: [';', hardline]
        })
      : '',
    '}'
  ]
};
