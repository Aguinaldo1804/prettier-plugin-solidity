import { doc } from 'prettier';
import type { ReturnStatement as IReturnStatement } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from '../types';

const { group, indent, line } = doc.builders;

const expression = (
  node: IReturnStatement,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc => {
  if (node.expression) {
    return node.expression.type === 'TupleExpression'
      ? [' ', path.call(print, 'expression')]
      : group(indent([line, path.call(print, 'expression')]));
  }
  return '';
};

export const ReturnStatement: NodePrinter<IReturnStatement> = {
  print: ({ node, path, print }) => [
    'return',
    expression(node, path, print),
    ';'
  ]
};
