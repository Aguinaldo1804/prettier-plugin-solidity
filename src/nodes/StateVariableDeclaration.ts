import { doc } from 'prettier';
import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { group, indent, line } = doc.builders;

const initialValue = (
  node: AST.StateVariableDeclaration,
  path: AstPath,
  print: (path: AstPath) => Doc
) => {
  if (!node.initialValue) {
    return '';
  }

  if (node.initialValue.type === 'TupleExpression') {
    return [' = ', path.call(print, 'initialValue')];
  }

  return group([' =', indent([line, path.call(print, 'initialValue')])]);
};

export const StateVariableDeclaration: NodePrinter = {
  print: ({ node, path, print }) => [
    ...path.map(print, 'variables'),
    initialValue(node as AST.StateVariableDeclaration, path, print),
    ';'
  ]
};
