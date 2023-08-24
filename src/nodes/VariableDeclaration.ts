import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';
import type { AstPath, Doc } from 'prettier';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { group, indent, line } = doc.builders;

const indexed = (node: AST.VariableDeclaration) =>
  node.isIndexed ? ' indexed' : '';

const visibility = (node: AST.VariableDeclaration) =>
  node.visibility && node.visibility !== 'default'
    ? [line, node.visibility]
    : '';

const constantKeyword = (node: AST.VariableDeclaration) =>
  node.isDeclaredConst ? ' constant' : '';

const storageLocation = (node: AST.VariableDeclaration) =>
  node.storageLocation && node.visibility !== 'default'
    ? [line, node.storageLocation]
    : '';

const immutable = (node: AST.StateVariableDeclarationVariable) =>
  node.isImmutable ? ' immutable' : '';

const override = (
  node: AST.StateVariableDeclarationVariable,
  path: AstPath,
  print: (path: AstPath) => Doc
) => {
  if (!node.override) return '';
  if (node.override.length === 0) return [line, 'override'];
  return [
    line,
    'override(',
    printSeparatedList(path.map(print, 'override')),
    ')'
  ];
};

const name = (node: AST.VariableDeclaration) =>
  node.name ? [' ', node.name] : '';

export const VariableDeclaration: NodePrinter<AST.VariableDeclaration> = {
  print: ({ node, path, print }) =>
    node.typeName
      ? group([
          path.call(print, 'typeName'),
          indent([
            indexed(node),
            visibility(node),
            constantKeyword(node),
            storageLocation(node),
            immutable(node as AST.StateVariableDeclarationVariable),
            override(node as AST.StateVariableDeclarationVariable, path, print),
            name(node)
          ])
        ])
      : node.name!
};
