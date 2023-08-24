import { doc } from 'prettier';
import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { group, indent, line } = doc.builders;

const expression = (
  node: AST.ReturnStatement,
  path: AstPath,
  print: (path: AstPath) => Doc
) => {
  if (node.expression) {
    return node.expression.type === 'TupleExpression'
      ? [' ', path.call(print, 'expression')]
      : group(indent([line, path.call(print, 'expression')]));
  }
  return '';
};

export const ReturnStatement: NodePrinter = {
  print: ({ node, path, print }) => [
    'return',
    expression(node as AST.ReturnStatement, path, print),
    ';'
  ]
};
