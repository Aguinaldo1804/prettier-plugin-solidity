import { printSeparatedList } from '../common/printer-helpers.js';
import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const parameters = (
  node: AST.CatchClause,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.parameters
    ? [
        node.kind || '',
        '(',
        printSeparatedList(path.map(print, 'parameters')),
        ') '
      ]
    : '';

export const CatchClause: NodePrinter<AST.CatchClause> = {
  print: ({ node, path, print }) => [
    'catch ',
    parameters(node, path, print),
    path.call(print, 'body')
  ]
};
