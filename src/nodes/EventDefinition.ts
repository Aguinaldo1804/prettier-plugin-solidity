import { printSeparatedList } from '../common/printer-helpers.js';
import type { AstPath, Doc } from 'prettier';
import type { AST, NodePrinter } from '../types';

const parameters = (
  node: AST.EventDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
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
