import { doc } from 'prettier';
import {
  printComments,
  printPreservingEmptyLines,
  printSeparatedItem
} from '../common/printer-helpers';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { hardline } = doc.builders;

export const AssemblyBlock: NodePrinter = {
  print: ({ node, options, path, print }) => [
    '{',
    printSeparatedItem(
      [
        printPreservingEmptyLines(path, 'operations', options, print),
        printComments(node, path, options)
      ],
      { firstSeparator: hardline, grouped: false }
    ),
    '}'
  ]
};
