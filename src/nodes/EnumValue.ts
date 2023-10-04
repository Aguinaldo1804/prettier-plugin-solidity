import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const EnumValue: NodePrinter<AST.EnumValue> = {
  print: ({ node }) => node.name
};
