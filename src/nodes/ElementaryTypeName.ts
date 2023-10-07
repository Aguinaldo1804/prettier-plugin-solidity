import type { ElementaryTypeName as IElementaryTypeName } from '@solidity-parser/parser/src/ast-types';
import type { Doc } from 'prettier';
import type { NodePrinter } from '../types';

const stateMutability = (node: IElementaryTypeName): Doc =>
  node.stateMutability && node.stateMutability.length > 0
    ? [' ', node.stateMutability]
    : '';

export const ElementaryTypeName: NodePrinter<IElementaryTypeName> = {
  print: ({ node }) => [node.name, stateMutability(node)]
};
