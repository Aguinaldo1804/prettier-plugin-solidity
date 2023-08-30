import type { AST, NodePrinter } from '../types';

export const Continue: NodePrinter<AST.Continue> = { print: () => 'continue' };
