import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const stateMutability = (node: AST.ElementaryTypeName) =>
  node.stateMutability && node.stateMutability.length > 0
    ? [' ', node.stateMutability]
    : '';

export const ElementaryTypeName: NodePrinter<AST.ElementaryTypeName> = {
  print: ({ node }) => [node.name, stateMutability(node)]
};
