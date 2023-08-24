import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers';
import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { group, indent, line } = doc.builders;

const printBody = (
  node: AST.DoWhileStatement,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.body.type === 'Block'
    ? [' ', path.call(print, 'body'), ' ']
    : group([indent([line, path.call(print, 'body')]), line]);

export const DoWhileStatement: NodePrinter = {
  print: ({ node, path, print }) => [
    'do',
    printBody(node as AST.DoWhileStatement, path, print),
    'while (',
    printSeparatedItem(path.call(print, 'condition')),
    ');'
  ]
};
