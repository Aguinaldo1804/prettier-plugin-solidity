import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import type {
  StateVariableDeclarationVariable,
  VariableDeclaration as IVariableDeclaration
} from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from '../types';

const { group, indent, line } = doc.builders;

const indexed = (node: IVariableDeclaration): Doc =>
  node.isIndexed ? ' indexed' : '';

const visibility = (node: IVariableDeclaration): Doc =>
  node.visibility && node.visibility !== 'default'
    ? [line, node.visibility]
    : '';

const constantKeyword = (node: IVariableDeclaration): Doc =>
  node.isDeclaredConst ? ' constant' : '';

const storageLocation = (node: IVariableDeclaration): Doc =>
  node.storageLocation && node.visibility !== 'default'
    ? [line, node.storageLocation]
    : '';

const immutable = (node: StateVariableDeclarationVariable): Doc =>
  node.isImmutable ? ' immutable' : '';

const override = (
  node: StateVariableDeclarationVariable,
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

const name = (node: IVariableDeclaration): Doc =>
  node.name ? [' ', node.name] : '';

export const VariableDeclaration: NodePrinter<IVariableDeclaration> = {
  print: ({ node, path, print }) =>
    node.typeName
      ? group([
          path.call(print, 'typeName'),
          indent([
            indexed(node),
            visibility(node),
            constantKeyword(node),
            storageLocation(node),
            immutable(node as StateVariableDeclarationVariable),
            override(node as StateVariableDeclarationVariable, path, print),
            name(node)
          ])
        ])
      : node.name!
};
