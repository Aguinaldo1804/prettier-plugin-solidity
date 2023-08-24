import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { hardline } = doc.builders;

export const StructDefinition: NodePrinter = {
  print: ({ node, path, print }) => [
    'struct ',
    (node as AST.StructDefinition).name,
    ' {',
    (node as AST.StructDefinition).members.length > 0
      ? printSeparatedList(path.map(print, 'members'), {
          firstSeparator: hardline,
          separator: [';', hardline],
          lastSeparator: [';', hardline]
        })
      : '',
    '}'
  ]
};
