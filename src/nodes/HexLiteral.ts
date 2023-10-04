import { doc } from 'prettier';
import { printString } from '../common/util.js';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const { join, line } = doc.builders;

export const HexLiteral: NodePrinter<AST.HexLiteral> = {
  print: ({ node, options }) => {
    const list = node.parts.map((part) => `hex${printString(part, options)}`);
    return join(line, list);
  }
};
