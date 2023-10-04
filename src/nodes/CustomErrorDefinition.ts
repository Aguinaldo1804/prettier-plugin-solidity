import { printSeparatedList } from '../common/printer-helpers.js';
import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const parameters = (
  node: AST.CustomErrorDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.parameters && node.parameters.length > 0
    ? printSeparatedList(path.map(print, 'parameters'))
    : '';

export const CustomErrorDefinition: NodePrinter<AST.CustomErrorDefinition> = {
  print: ({ node, path, print }) => [
    'error ',
    node.name,
    '(',
    parameters(node, path, print),
    ');'
  ]
};
