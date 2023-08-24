import { arithmetic } from './arithmetic';
import type { BinaryOperationPrinter } from './types';

export const bit: BinaryOperationPrinter = {
  match: (op) => ['&', '|', '^'].includes(op),
  print: arithmetic.print
};
