import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers';
import type { AstPath, Doc } from 'prettier';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { group, indent, line } = doc.builders;

const printBody = (
  node: AST.WhileStatement,
  path: AstPath,
  print: (path: AstPath) => Doc
) =>
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