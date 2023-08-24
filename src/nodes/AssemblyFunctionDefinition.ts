import { doc } from 'prettier';
import {
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { line } = doc.builders;

export const AssemblyFunctionDefinition: NodePrinter = {
  print: ({ node, path, print }) => [
    'function ',
    (node as AST.AssemblyFunctionDefinition).name,
    '(',
    printSeparatedList(path.map(print, 'arguments')),
    ')',
    (node as AST.AssemblyFunctionDefinition).returnArguments.length === 0
      ? ' '
      : printSeparatedItem(
          [
            '->',
            printSeparatedList(path.map(print, 'returnArguments'), {
              firstSeparator: line,
              lastSeparator: ''
            })
          ],
          { firstSeparator: line }
        ),
    path.call(print, 'body')
  ]
};
