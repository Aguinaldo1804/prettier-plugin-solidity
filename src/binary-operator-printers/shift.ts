import { arithmetic } from './arithmetic.js';
import type { BinaryOperationPrinter } from './types';

export const shift: BinaryOperationPrinter = {
  match: (op) => ['<<', '>>'].includes(op),
  print: arithmetic.print
};
