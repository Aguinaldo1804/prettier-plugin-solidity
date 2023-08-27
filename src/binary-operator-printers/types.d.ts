import type { BinOp } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { AST } from '../prettier-plugin-solidity';

interface BinaryOperationPrinter {
  match: (op: BinOp) => boolean;
  print: (
    node: AST.BinaryOperation,
    path: AstPath,
    print: (path: AstPath) => Doc
  ) => Doc;
}
