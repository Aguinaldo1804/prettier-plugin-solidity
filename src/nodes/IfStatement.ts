import { doc } from 'prettier';
import {
  printComments,
  printSeparatedItem
} from '../common/printer-helpers.js';
import type {
  Comment,
  IfStatement as IIfStatement,
  Statement
} from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from '../types';

const { group, hardline, indent, line } = doc.builders;

const printTrueBody = (
  node: Statement,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc => {
  if (node.type === 'Block') {
    return [' ', path.call(print, 'trueBody')];
  }

  const ifWithinIf = node.type === 'IfStatement';
  return group(
    indent([ifWithinIf ? hardline : line, path.call(print, 'trueBody')])
  );
};

const printFalseBody = (
  node: Statement,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.type === 'Block' || node.type === 'IfStatement'
    ? [' ', path.call(print, 'falseBody')]
    : group(indent([line, path.call(print, 'falseBody')]));

const printElse = (
  node: IIfStatement,
  path: AstPath,
  print: (path: AstPath) => Doc,
  commentsBetweenIfAndElse: Comment[]
): Doc => {
  if (node.falseBody) {
    const elseOnSameLine =
      node.trueBody.type === 'Block' && commentsBetweenIfAndElse.length === 0;
    return [
      elseOnSameLine ? ' ' : hardline,
      'else',
      printFalseBody(node.falseBody, path, print)
    ];
  }
  return '';
};

export const IfStatement: NodePrinter<IIfStatement> = {
  print: ({ node, options, path, print }) => {
    const comments = node.comments || [];
    const commentsBetweenIfAndElse = comments.filter(
      (comment) => !comment.leading && !comment.trailing
    );

    const parts = [];

    parts.push('if (', printSeparatedItem(path.call(print, 'condition')), ')');
    parts.push(printTrueBody(node.trueBody, path, print));
    if (commentsBetweenIfAndElse.length && node.falseBody) {
      parts.push(hardline);
      parts.push(printComments(node, path, options));
    }
    parts.push(printElse(node, path, print, commentsBetweenIfAndElse));

    return parts;
  }
};
