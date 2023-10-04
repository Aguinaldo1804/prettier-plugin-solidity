import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const Continue: NodePrinter<AST.Continue> = { print: () => 'continue' };
