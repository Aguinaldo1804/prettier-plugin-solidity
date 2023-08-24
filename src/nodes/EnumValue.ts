import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

export const EnumValue: NodePrinter = {
  print: ({ node }) => (node as AST.EnumValue).name
};
