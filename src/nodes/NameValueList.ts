import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { line, softline } = doc.builders;

export const NameValueList: NodePrinter<AST.NameValueList> = {
  print: ({ node, path, print, options }) =>
    printSeparatedList(
      path
        .map(print, 'arguments')
        .map((argument, index) => [node.names[index], ': ', argument]),
      {
        firstSeparator: options.bracketSpacing ? line : softline
      }
    )
};
