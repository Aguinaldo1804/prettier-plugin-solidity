import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const Continue: NodePrinter<AST.Continue> = { print: () => 'continue' };
