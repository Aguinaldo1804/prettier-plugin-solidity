import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const Break: NodePrinter<AST.Break> = { print: () => 'break' };
