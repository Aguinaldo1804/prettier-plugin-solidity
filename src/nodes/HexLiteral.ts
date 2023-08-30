import { doc } from 'prettier';
import { printString } from '../common/util.js';
import type { AST, NodePrinter } from '../types';

const { join, line } = doc.builders;

export const HexLiteral: NodePrinter<AST.HexLiteral> = {
  print: ({ node, options }) => {
    const list = node.parts.map((part) => `hex${printString(part, options)}`);
    return join(line, list);
  }
};
