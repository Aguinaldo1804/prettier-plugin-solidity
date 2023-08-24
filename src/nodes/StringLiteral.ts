import { doc } from 'prettier';
import { printString } from '../common/util';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { join, hardline } = doc.builders;

export const StringLiteral: NodePrinter = {
  print: ({ node, options }) => {
    const list = (node as AST.StringLiteral).parts.map(
      (part, index) =>
        // node.isUnicode is an array of the same length as node.parts
        // that indicates if that string fragment has the unicode prefix
        ((node as AST.StringLiteral).isUnicode[index] ? 'unicode' : '') +
        printString(part, options)
    );

    return join(hardline, list);
  }
};
