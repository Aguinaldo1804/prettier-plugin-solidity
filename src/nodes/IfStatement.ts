import { doc } from 'prettier';
import {
  printComments,
  printSeparatedItem
} from '../common/printer-helpers.js';
import type {
  IfStatement as IIfStatement,
  Statement
} from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc, ParserOptions } from 'prettier';
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
  options: ParserOptions
): Doc[] => {
  const parts = [];
  if (node.falseBody) {
    const comments = printComments(node, path, options);
    if (comments.length) {
      parts.push(hardline, comments);
    }

    const elseOnSameLine =
      node.trueBody.type === 'Block' && comments.length === 0;

    parts.push(
      elseOnSameLine ? ' ' : hardline,
      'else',
      printFalseBody(node.falseBody, path, print)
    );
  }
  return parts;
};

export const IfStatement: NodePrinter<IIfStatement> = {
  print: ({ node, path, print, options }) => [
    'if (',
    printSeparatedItem(path.call(print, 'condition')),
    ')',
    printTrueBody(node.trueBody, path, print),
    printElse(node, path, print, options)
  ]
};
