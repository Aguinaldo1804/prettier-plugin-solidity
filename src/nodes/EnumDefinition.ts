import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { group, hardline } = doc.builders;

export const EnumDefinition: NodePrinter = {
  print: ({ node, path, print }) =>
    group([
      'enum ',
      (node as AST.EnumDefinition).name,
      ' {',
      printSeparatedList(path.map(print, 'members'), {
        firstSeparator: hardline
      }),
      '}'
    ])
};
