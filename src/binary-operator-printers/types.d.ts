import type {
  BinOp,
  BinaryOperation
} from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';

interface BinaryOperationPrinter {
  match: (op: BinOp) => boolean;
  print: (
    node: BinaryOperation,
    path: AstPath,
    print: (path: AstPath) => Doc
  ) => Doc;
}
