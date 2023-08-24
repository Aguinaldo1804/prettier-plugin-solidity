import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';
import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { group } = doc.builders;

const contents = (
  node: AST.TupleExpression,
  path: AstPath,
  print: (path: AstPath) => Doc
) =>
  node.components &&
  node.components.length === 1 &&
  node.components[0]!.type === 'BinaryOperation'
    ? path.map(print, 'components')
    : [printSeparatedList(path.map(print, 'components'))];

export const TupleExpression: NodePrinter = {
  print: ({ node, path, print }) =>
    group([
      (node as AST.TupleExpression).isArray ? '[' : '(',
      ...contents(node as AST.TupleExpression, path, print),
      (node as AST.TupleExpression).isArray ? ']' : ')'
    ])
};
