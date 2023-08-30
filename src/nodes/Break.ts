import type { AST, NodePrinter } from '../types';

export const Break: NodePrinter<AST.Break> = { print: () => 'break' };
