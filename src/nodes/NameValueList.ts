import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { line, softline } = doc.builders;

export const NameValueList: NodePrinter = {
  print: ({ node, path, print, options }) =>
    printSeparatedList(
      path
        .map(print, 'arguments')
        .map((argument, index) => [
          (node as AST.NameValueList).names[index],
          ': ',
          argument
        ]),
      {
        firstSeparator: options.bracketSpacing ? line : softline
      }
    )
};
