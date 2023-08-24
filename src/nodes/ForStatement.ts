import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';
import type { AstPath, Doc } from 'prettier';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { group, indent, line } = doc.builders;

const initExpression = (
  node: AST.ForStatement,
  path: AstPath,
  print: (path: AstPath) => Doc
) => (node.initExpression ? path.call(print, 'initExpression') : '');

const conditionExpression = (
  node: AST.ForStatement,
  path: AstPath,
  print: (path: AstPath) => Doc
) => (node.conditionExpression ? path.call(print, 'conditionExpression') : '');

const loopExpression = (
  node: AST.ForStatement,
  path: AstPath,
  print: (path: AstPath) => Doc
) => (node.loopExpression.expression ? path.call(print, 'loopExpression') : '');

const printBody = (
  node: AST.ForStatement,
  path: AstPath,
  print: (path: AstPath) => Doc
) =>
  node.body.type === 'Block'
    ? [' ', path.call(print, 'body')]
    : group(indent([line, path.call(print, 'body')]));

export const ForStatement: NodePrinter<AST.ForStatement> = {
  print: ({ node, path, print }) => [
    'for (',
    printSeparatedList(
      [
        initExpression(node, path, print),
        conditionExpression(node, path, print),
        loopExpression(node, path, print)
      ],
      {
        separator:
          node.initExpression ||
          node.conditionExpression ||
          node.loopExpression.expression
            ? [';', line]
            : ';'
      }
    ),
    ')',
    printBody(node, path, print)
  ]
};
