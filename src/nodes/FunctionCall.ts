import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';
import { isLabel } from '../common/util';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { GroupWithId, LabelWithLabel } from '../common/util';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { group, indentIfBreak, label, line, softline } = doc.builders;

const printObject = (
  path: AstPath,
  print: (path: AstPath) => Doc,
  options: ParserOptions
) => {
  const identifiers = path.map(print, 'identifiers');
  return [
    '{',
    printSeparatedList(
      path
        .map(print, 'arguments')
        .map((arg, index) => [identifiers[index], ': ', arg]),
      {
        firstSeparator: options.bracketSpacing ? line : softline,
        lastSeparator: [options.bracketSpacing ? line : softline, '})']
      }
    )
  ];
};

const printArguments = (path: AstPath, print: (path: AstPath) => Doc) =>
  printSeparatedList(path.map(print, 'arguments'), {
    lastSeparator: [softline, ')']
  });

let groupIndex = 0;
export const FunctionCall: NodePrinter = {
  print: ({ node, path, print, options }) => {
    let expressionDoc = path.call(print, 'expression');
    let argumentsDoc: Doc = ')';

    if (
      (node as AST.FunctionCall).arguments &&
      (node as AST.FunctionCall).arguments.length > 0
    ) {
      if (
        (node as AST.FunctionCall).identifiers &&
        (node as AST.FunctionCall).identifiers.length > 0
      ) {
        argumentsDoc = printObject(path, print, options);
      } else {
        argumentsDoc = printArguments(path, print);
      }
    }

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (
      isLabel(expressionDoc) &&
      (expressionDoc as LabelWithLabel).label === 'MemberAccessChain'
    ) {
      expressionDoc = group((expressionDoc as LabelWithLabel).contents, {
        id: Symbol(`FunctionCall.expression-${groupIndex}`)
      });

      groupIndex += 1;

      argumentsDoc = indentIfBreak(argumentsDoc, {
        groupId: (expressionDoc as GroupWithId).id
      });
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label('MemberAccessChain', [expressionDoc, '(', argumentsDoc]);
    }

    return [expressionDoc, '(', argumentsDoc];
  }
};
