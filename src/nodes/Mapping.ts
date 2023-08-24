import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const namedParameter = (
  prefix: 'key' | 'value',
  node: AST.Mapping,
  path: AstPath,
  print: (path: AstPath) => Doc
) =>
  node[`${prefix}Name`]
    ? [
        path.call(print, `${prefix}Type`),
        ' ',
        path.call(print, `${prefix}Name`)
      ]
    : path.call(print, `${prefix}Type`);

export const Mapping: NodePrinter = {
  print: ({ node, path, print }) => [
    'mapping(',
    namedParameter('key', node as AST.Mapping, path, print),
    ' => ',
    namedParameter('value', node as AST.Mapping, path, print),
    ')'
  ]
};
