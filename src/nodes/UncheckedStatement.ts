import { doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const { group } = doc.builders;

export const UncheckedStatement: NodePrinter<AST.UncheckedStatement> = {
  print: ({ path, print }) => group(['unchecked ', path.call(print, 'block')])
};
