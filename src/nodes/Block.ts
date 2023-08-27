import { doc } from 'prettier';
import {
  printComments,
  printPreservingEmptyLines
} from '../common/printer-helpers.js';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { hardline, indent } = doc.builders;

export const Block: NodePrinter<AST.Block> = {
  print: ({ node, options, path, print }) =>
    // if block is empty, just return the pair of braces
    node.statements.length === 0 && !node.comments
      ? '{}'
      : [
          '{',
          indent([
            hardline,
            printPreservingEmptyLines(path, 'statements', options, print),
            printComments(node, path, options)
          ]),
          hardline,
          '}'
        ]
};
