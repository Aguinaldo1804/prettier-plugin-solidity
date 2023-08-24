// @TODO: add support for assembly language specifier
import { printString } from '../common/util';
import { printSeparatedList } from '../common/printer-helpers';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

export const InlineAssemblyStatement: NodePrinter = {
  print: ({ node, path, print, options }) => [
    'assembly ',
    (node as AST.InlineAssemblyStatement).language
      ? `${printString(
          (node as AST.InlineAssemblyStatement).language!,
          options
        )} `
      : '',
    (node as AST.InlineAssemblyStatement).flags &&
    (node as AST.InlineAssemblyStatement).flags.length > 0
      ? [
          '(',
          printSeparatedList(
            (node as AST.InlineAssemblyStatement).flags.map((flag) =>
              printString(flag, options)
            )
          ),
          ') '
        ]
      : '',
    path.call(print, 'body')
  ]
};
