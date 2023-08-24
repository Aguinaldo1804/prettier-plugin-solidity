import { printSeparatedList } from '../common/printer-helpers';
import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const parameters = (
  node: AST.CatchClause,
  path: AstPath,
  print: (path: AstPath) => Doc
) =>
  node.parameters
    ? [
        node.kind || '',
        '(',
        printSeparatedList(path.map(print, 'parameters')),
        ') '
      ]
    : '';

export const CatchClause: NodePrinter = {
  print: ({ node, path, print }) => [
    'catch ',
    parameters(node as AST.CatchClause, path, print),
    path.call(print, 'body')
  ]
};
