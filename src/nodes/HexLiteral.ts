import { doc } from 'prettier';
import { printString } from '../common/util';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { join, line } = doc.builders;

export const HexLiteral: NodePrinter = {
  print: ({ node, options }) => {
    const list = (node as AST.HexLiteral).parts.map(
      (part) => `hex${printString(part, options)}`
    );
    return join(line, list);
  }
};
