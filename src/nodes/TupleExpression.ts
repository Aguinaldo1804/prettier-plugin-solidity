import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import type { AstPath, Doc } from 'prettier';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { group } = doc.builders;

const contents = (
  node: AST.TupleExpression,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc[] =>
  node.components.length === 1 && node.components[0]!.type === 'BinaryOperation'
    ? path.map(print, 'components')
    : [printSeparatedList(path.map(print, 'components'))];

export const TupleExpression: NodePrinter<AST.TupleExpression> = {
  print: ({ node, path, print }) =>
    group([
      node.isArray ? '[' : '(',
      ...contents(node, path, print),
      node.isArray ? ']' : ')'
    ])
};
