import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';
import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

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

export const ForStatement: NodePrinter = {
  print: ({ node, path, print }) => [
    'for (',
    printSeparatedList(
      [
        initExpression(node as AST.ForStatement, path, print),
        conditionExpression(node as AST.ForStatement, path, print),
        loopExpression(node as AST.ForStatement, path, print)
      ],
      {
        separator:
          (node as AST.ForStatement).initExpression ||
          (node as AST.ForStatement).conditionExpression ||
          (node as AST.ForStatement).loopExpression.expression
            ? [';', line]
            : ';'
      }
    ),
    ')',
    printBody(node as AST.ForStatement, path, print)
  ]
};
