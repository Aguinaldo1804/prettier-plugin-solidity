import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

export const FileLevelConstant: NodePrinter = {
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    ' constant ',
    (node as AST.FileLevelConstant).name,
    ' = ',
    path.call(print, 'initialValue'),
    ';'
  ]
};
