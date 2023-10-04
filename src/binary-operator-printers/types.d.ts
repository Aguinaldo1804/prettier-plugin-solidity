import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';

interface BinaryOperationPrinter {
  match: (op: AST.BinOp) => boolean;
  print: (
    node: AST.BinaryOperation,
    path: AstPath,
    print: (path: AstPath) => Doc
  ) => Doc;
}
