import { printSeparatedList } from '../common/printer-helpers';
import type { AstPath, Doc } from 'prettier';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const parameters = (
  node: AST.EventDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
) =>
  node.parameters && node.parameters.length > 0
    ? printSeparatedList(path.map(print, 'parameters'))
    : '';

export const EventDefinition: NodePrinter<AST.EventDefinition> = {
  print: ({ node, path, print }) => [
    'event ',
    node.name,
    '(',
    parameters(node, path, print),
    ')',
    node.isAnonymous ? ' anonymous' : '',
    ';'
  ]
};
