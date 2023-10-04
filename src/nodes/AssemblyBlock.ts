import { doc } from 'prettier';
import {
  printComments,
  printPreservingEmptyLines,
  printSeparatedItem
} from '../common/printer-helpers.js';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

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
