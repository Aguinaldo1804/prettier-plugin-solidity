import { printSeparatedList } from '../common/printer-helpers';
import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const parameters = (
  node: AST.CustomErrorDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
) =>
  node.parameters && node.parameters.length > 0
    ? printSeparatedList(path.map(print, 'parameters'))
    : '';

export const CustomErrorDefinition: NodePrinter = {
  print: ({ node, path, print }) => [
    'error ',
    (node as AST.CustomErrorDefinition).name,
    '(',
    parameters(node as AST.CustomErrorDefinition, path, print),
    ');'
  ]
};
