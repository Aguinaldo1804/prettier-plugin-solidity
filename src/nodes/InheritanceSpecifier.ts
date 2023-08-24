import { printSeparatedList } from '../common/printer-helpers';
import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const printArguments = (
  node: AST.InheritanceSpecifier,
  path: AstPath,
  print: (path: AstPath) => Doc
) =>
  node.arguments && node.arguments.length
    ? ['(', printSeparatedList(path.map(print, 'arguments')), ')']
    : '';

export const InheritanceSpecifier: NodePrinter = {
  print: ({ node, path, print }) => [
    path.call(print, 'baseName'),
    printArguments(node as AST.InheritanceSpecifier, path, print)
  ]
};
