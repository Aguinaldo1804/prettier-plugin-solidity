import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

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
