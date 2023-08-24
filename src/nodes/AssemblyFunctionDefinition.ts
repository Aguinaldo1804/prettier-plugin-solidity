import { doc } from 'prettier';
import {
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { line } = doc.builders;

export const AssemblyFunctionDefinition: NodePrinter<AST.AssemblyFunctionDefinition> =
  {
    print: ({ node, path, print }) => [
      'function ',
      node.name,
      '(',
      printSeparatedList(path.map(print, 'arguments')),
      ')',
      node.returnArguments.length === 0
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
