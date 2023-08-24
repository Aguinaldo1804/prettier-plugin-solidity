import { printSeparatedList } from '../common/printer-helpers';
import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const parameters = (
  node: AST.EventDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
) =>
  node.parameters && node.parameters.length > 0
    ? printSeparatedList(path.map(print, 'parameters'))
    : '';

export const EventDefinition: NodePrinter = {
  print: ({ node, path, print }) => [
    'event ',
    (node as AST.EventDefinition).name,
    '(',
    parameters(node as AST.EventDefinition, path, print),
    ')',
    (node as AST.EventDefinition).isAnonymous ? ' anonymous' : '',
    ';'
  ]
};
