import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const NewExpression: NodePrinter<AST.NewExpression> = {
  print: ({ path, print }) => ['new ', path.call(print, 'typeName')]
};
