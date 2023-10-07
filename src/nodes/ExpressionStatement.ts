import { doc } from 'prettier';
import { printComments } from '../common/printer-helpers.js';
import type { ExpressionStatement as IExpressionStatement } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const { hardline } = doc.builders;

export const ExpressionStatement: NodePrinter<IExpressionStatement> = {
  print: ({ node, options, path, print }) => {
    const parts = [];

    const parent = path.getParentNode();

    if (parent.type === 'IfStatement') {
      if (node.comments && node.comments.length) {
        const comments = printComments(node, path, options);
        if (comments && comments.length) {
          parts.push(comments);
          parts.push(hardline);
        }
      }
    }

    parts.push(path.call(print, 'expression'));
    parts.push(node.omitSemicolon ? '' : ';');

    return parts;
  }
};
