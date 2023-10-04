import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const RevertStatement: NodePrinter<AST.RevertStatement> = {
  print: ({ path, print }) => ['revert ', path.call(print, 'revertCall'), ';']
};
