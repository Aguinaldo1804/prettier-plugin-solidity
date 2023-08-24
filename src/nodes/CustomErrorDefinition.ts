import { printSeparatedList } from '../common/printer-helpers';
import type { AstPath, Doc } from 'prettier';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const parameters = (
  node: AST.CustomErrorDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
) =>
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
