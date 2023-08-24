import { doc } from 'prettier';
import { printComments } from '../common/printer-helpers';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { hardline } = doc.builders;

export const ExpressionStatement: NodePrinter<AST.ExpressionStatement> = {
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
