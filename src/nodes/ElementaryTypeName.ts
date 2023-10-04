import type { Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const stateMutability = (node: AST.ElementaryTypeName): Doc =>
  node.stateMutability && node.stateMutability.length > 0
    ? [' ', node.stateMutability]
    : '';

export const ElementaryTypeName: NodePrinter<AST.ElementaryTypeName> = {
  print: ({ node }) => [node.name, stateMutability(node)]
};
