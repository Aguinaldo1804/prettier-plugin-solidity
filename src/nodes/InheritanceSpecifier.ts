import { printSeparatedList } from '../common/printer-helpers.js';
import type { AstPath, Doc } from 'prettier';
import type { AST, NodePrinter } from '../types';

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
