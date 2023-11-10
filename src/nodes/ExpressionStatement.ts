import { doc } from 'prettier';
import { printComments } from '../common/printer-helpers.js';
import type { ExpressionStatement as IExpressionStatement } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const { hardline } = doc.builders;

export const ExpressionStatement: NodePrinter<IExpressionStatement> = {
  print: ({ node, options, path, print }) => {
    const parts = [];

    if (path.getParentNode().type === 'IfStatement') {
      const comments = printComments(node, path, options);
      if (comments.length) {
        parts.push(comments, hardline);
      }
    }

    parts.push(path.call(print, 'expression'));
    if (!node.omitSemicolon) {
      parts.push(';');
    }
    return parts;
  }
};
