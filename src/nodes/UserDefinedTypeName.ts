import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const UserDefinedTypeName: NodePrinter<AST.UserDefinedTypeName> = {
  print: ({ node }) => node.namePath
};
