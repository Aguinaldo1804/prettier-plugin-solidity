import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';
import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

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

export const VariableDeclaration: NodePrinter = {
  print: ({ node, path, print }) =>
    (node as AST.VariableDeclaration).typeName
      ? group([
          path.call(print, 'typeName'),
          indent([
            indexed(node as AST.VariableDeclaration),
            visibility(node as AST.VariableDeclaration),
            constantKeyword(node as AST.VariableDeclaration),
            storageLocation(node as AST.VariableDeclaration),
            immutable(node as AST.StateVariableDeclarationVariable),
            override(node as AST.StateVariableDeclarationVariable, path, print),
            name(node as AST.VariableDeclaration)
          ])
        ])
      : (node as AST.VariableDeclaration).name!
};
