import { doc } from 'prettier';
import { printComments, printSeparatedItem } from '../common/printer-helpers';
import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { Comment, NodePrinter } from '../prettier-plugin-solidity';

const { group, hardline, indent, line } = doc.builders;

const printTrueBody = (
  node: AST.IfStatement,
  path: AstPath,
  print: (path: AstPath) => Doc
) => {
  if (node.trueBody.type === 'Block') {
    return [' ', path.call(print, 'trueBody')];
  }

  const ifWithinIf = node.trueBody.type === 'IfStatement';
  return group(
    indent([ifWithinIf ? hardline : line, path.call(print, 'trueBody')])
  );
};

const printFalseBody = (
  node: AST.IfStatement,
  path: AstPath,
  print: (path: AstPath) => Doc
) =>
  node.falseBody!.type === 'Block' || node.falseBody!.type === 'IfStatement'
    ? [' ', path.call(print, 'falseBody')]
    : group(indent([line, path.call(print, 'falseBody')]));

const printElse = (
  node: AST.IfStatement,
  path: AstPath,
  print: (path: AstPath) => Doc,
  commentsBetweenIfAndElse: Comment[]
) => {
  if (node.falseBody) {
    const elseOnSameLine =
      node.trueBody.type === 'Block' && commentsBetweenIfAndElse.length === 0;
    return [
      elseOnSameLine ? ' ' : hardline,
      'else',
      printFalseBody(node, path, print)
    ];
  }
  return '';
};

export const IfStatement: NodePrinter = {
  print: ({ node, options, path, print }) => {
    const comments = node.comments || [];
    const commentsBetweenIfAndElse = comments.filter(
      (comment) => !comment.leading && !comment.trailing
    );

    const parts = [];

    parts.push('if (', printSeparatedItem(path.call(print, 'condition')), ')');
    parts.push(printTrueBody(node as AST.IfStatement, path, print));
    if (
      commentsBetweenIfAndElse.length &&
      (node as AST.IfStatement).falseBody
    ) {
      parts.push(hardline);
      parts.push(printComments(node, path, options));
    }
    parts.push(
      printElse(node as AST.IfStatement, path, print, commentsBetweenIfAndElse)
    );

    return parts;
  }
};
