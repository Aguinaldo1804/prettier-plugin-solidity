import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const stateMutability = (node: AST.ElementaryTypeName) =>
  node.stateMutability && node.stateMutability.length > 0
    ? [' ', node.stateMutability]
    : '';

export const ElementaryTypeName: NodePrinter = {
  print: ({ node }) => [
    (node as AST.ElementaryTypeName).name,
    stateMutability(node as AST.ElementaryTypeName)
  ]
};
