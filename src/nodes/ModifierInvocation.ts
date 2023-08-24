import { printComments, printSeparatedList } from '../common/printer-helpers';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const modifierArguments = (
  node: AST.ModifierInvocation,
  path: AstPath,
  print: (path: AstPath) => Doc,
  options: ParserOptions
) => {
  if (node.arguments) {
    // We always print parentheses at this stage because the parser already
    // stripped them in FunctionDefinitions that are not a constructor.
    return node.arguments.length > 0
      ? ['(', printSeparatedList(path.map(print, 'arguments')), ')']
      : '()';
  }

  if (
    node.comments &&
    node.comments.some(
      (comment) => !comment.leading && !comment.trailing && !comment.printed
    )
  ) {
    // We print parentheses here because the comment is supposed to be a block
    // comment inside empty parentheses.
    //    modifier(/* comment */)
    return ['(', printComments(node, path, options), ')'];
  }

  return '';
};

export const ModifierInvocation: NodePrinter<AST.ModifierInvocation> = {
  print: ({ node, path, print, options }) => [
    node.name,
    modifierArguments(node, path, print, options)
  ]
};
