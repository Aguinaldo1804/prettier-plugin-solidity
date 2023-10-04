import { printSeparatedList } from '../common/printer-helpers.js';
import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const printArguments = (
  node: AST.InheritanceSpecifier,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.arguments && node.arguments.length
    ? ['(', printSeparatedList(path.map(print, 'arguments')), ')']
    : '';

export const InheritanceSpecifier: NodePrinter<AST.InheritanceSpecifier> = {
  print: ({ node, path, print }) => [
    path.call(print, 'baseName'),
    printArguments(node, path, print)
  ]
};
