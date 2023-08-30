import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import type { AstPath, Doc } from 'prettier';
import type { AST, NodePrinter } from '../types';

const { group, indent, line } = doc.builders;

const printBody = (
  node: AST.WhileStatement,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.body.type === 'Block'
    ? [' ', path.call(print, 'body')]
    : group(indent([line, path.call(print, 'body')]));

export const WhileStatement: NodePrinter<AST.WhileStatement> = {
  print: ({ node, path, print }) => [
    'while (',
    printSeparatedItem(path.call(print, 'condition')),
    ')',
    printBody(node, path, print)
  ]
};
