import { doc } from 'prettier';
import {
  printComments,
  printPreservingEmptyLines,
  printSeparatedItem
} from '../common/printer-helpers.js';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { hardline } = doc.builders;

export const AssemblyBlock: NodePrinter<AST.AssemblyBlock> = {
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
