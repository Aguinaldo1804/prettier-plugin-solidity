import { doc } from 'prettier';
import {
  printComments,
  printPreservingEmptyLines
} from '../common/printer-helpers';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { hardline, indent } = doc.builders;

export const Block: NodePrinter = {
  print: ({ node, options, path, print }) =>
    // if block is empty, just return the pair of braces
    (node as AST.Block).statements.length === 0 && !node.comments
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
