import { doc } from 'prettier';
import type { AstPath, Doc } from 'prettier';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { group, indent, line } = doc.builders;

const initialValue = (
  node: AST.StateVariableDeclaration,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc => {
  if (!node.initialValue) {
    return '';
  }

  if (node.initialValue.type === 'TupleExpression') {
    return [' = ', path.call(print, 'initialValue')];
  }

  return group([' =', indent([line, path.call(print, 'initialValue')])]);
};

export const StateVariableDeclaration: NodePrinter<AST.StateVariableDeclaration> =
  {
    print: ({ node, path, print }) => [
      ...path.map(print, 'variables'),
      initialValue(node, path, print),
      ';'
    ]
  };
