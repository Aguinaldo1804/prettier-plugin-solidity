import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import type { AstPath, Doc } from 'prettier';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { group, indent, line } = doc.builders;

const indexed = (node: AST.VariableDeclaration): Doc =>
  node.isIndexed ? ' indexed' : '';

const visibility = (node: AST.VariableDeclaration): Doc =>
  node.visibility && node.visibility !== 'default'
    ? [line, node.visibility]
    : '';

const constantKeyword = (node: AST.VariableDeclaration): Doc =>
  node.isDeclaredConst ? ' constant' : '';

const storageLocation = (node: AST.VariableDeclaration): Doc =>
  node.storageLocation && node.visibility !== 'default'
    ? [line, node.storageLocation]
    : '';

const immutable = (node: AST.StateVariableDeclarationVariable): Doc =>
  node.isImmutable ? ' immutable' : '';

const override = (
  node: AST.StateVariableDeclarationVariable,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc => {
  if (!node.override) return '';
  if (node.override.length === 0) return [line, 'override'];
  return [
    line,
    'override(',
    printSeparatedList(path.map(print, 'override')),
    ')'
  ];
};

const name = (node: AST.VariableDeclaration): Doc =>
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
