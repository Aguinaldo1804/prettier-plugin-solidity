import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const { line, softline } = doc.builders;

export const NameValueList: NodePrinter<AST.NameValueList> = {
  print: ({ node, path, print, options }) =>
    printSeparatedList(
      path
        .map(print, 'arguments')
        .map((argument, index) => [node.names[index], ': ', argument]),
      { firstSeparator: options.bracketSpacing ? line : softline }
    )
};
