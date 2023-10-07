import { doc } from 'prettier';
import {
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers.js';
import type { TryStatement as ITryStatement } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from '../types';

const { join, line } = doc.builders;

const returnParameters = (
  node: ITryStatement,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.returnParameters
    ? [
        'returns (',
        printSeparatedList(path.map(print, 'returnParameters')),
        ')'
      ]
    : '';

export const TryStatement: NodePrinter<ITryStatement> = {
  print: ({ node, path, print }) => {
    let parts = [
      'try',
      printSeparatedItem(path.call(print, 'expression'), {
        firstSeparator: line
      })
    ];

    const formattedReturnParameters = returnParameters(node, path, print);
    if (formattedReturnParameters) {
      parts = parts.concat([formattedReturnParameters, ' ']);
    }

    parts = parts.concat([
      path.call(print, 'body'),
      ' ',
      join(' ', path.map(print, 'catchClauses'))
    ]);

    return parts;
  }
};
