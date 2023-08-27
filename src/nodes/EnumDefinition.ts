import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { group, hardline } = doc.builders;

export const EnumDefinition: NodePrinter<AST.EnumDefinition> = {
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
