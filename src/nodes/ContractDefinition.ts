import { doc } from 'prettier';
import {
  printComments,
  printPreservingEmptyLines,
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { group, line, hardline } = doc.builders;

const inheritance = (
  node: AST.ContractDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.baseContracts.length > 0
    ? [
        ' is',
        printSeparatedList(path.map(print, 'baseContracts'), {
          firstSeparator: line
        })
      ]
    : line;

const body = (
  node: AST.ContractDefinition,
  path: AstPath,
  options: ParserOptions,
  print: (path: AstPath) => Doc
): Doc => {
  const comments = printComments(node, path, options);
  return node.subNodes.length > 0 || comments.length
    ? printSeparatedItem(
        [printPreservingEmptyLines(path, 'subNodes', options, print), comments],
        { firstSeparator: hardline, grouped: false }
      )
    : '';
};

export const ContractDefinition: NodePrinter<AST.ContractDefinition> = {
  print: ({ node, options, path, print }) => [
    group([
      node.kind === 'abstract' ? 'abstract contract' : node.kind,
      ' ',
      node.name,
      inheritance(node, path, print),
      '{'
    ]),
    body(node, path, options, print),
    '}'
  ]
};
