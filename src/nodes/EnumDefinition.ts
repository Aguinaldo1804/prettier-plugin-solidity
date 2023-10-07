import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import type { EnumDefinition as IEnumDefinition } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const { group, hardline } = doc.builders;

export const EnumDefinition: NodePrinter<IEnumDefinition> = {
  print: ({ node, path, print }) =>
    group([
      'enum ',
      node.name,
      ' {',
      printSeparatedList(path.map(print, 'members'), {
        firstSeparator: hardline
      }),
      '}'
    ])
};
