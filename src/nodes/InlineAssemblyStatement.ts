// @TODO: add support for assembly language specifier
import { printString } from '../common/util.js';
import { printSeparatedList } from '../common/printer-helpers.js';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const InlineAssemblyStatement: NodePrinter<AST.InlineAssemblyStatement> =
  {
    print: ({ node, path, print, options }) => [
      'assembly ',
      node.language ? `${printString(node.language, options)} ` : '',
      node.flags && node.flags.length > 0
        ? [
            '(',
            printSeparatedList(
              node.flags.map((flag) => printString(flag, options))
            ),
            ') '
          ]
        : '',
      path.call(print, 'body')
    ]
  };
