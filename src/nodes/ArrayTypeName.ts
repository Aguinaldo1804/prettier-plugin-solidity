import type { ArrayTypeName as IArrayTypeName } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const ArrayTypeName: NodePrinter<IArrayTypeName> = {
  print: ({ node, path, print }) => [
    path.call(print, 'baseTypeName'),
    '[',
    node.length ? path.call(print, 'length') : '',
    ']'
  ]
};
