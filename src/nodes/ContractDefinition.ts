import { doc } from 'prettier';
import {
  printComments,
  printPreservingEmptyLines,
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { group, line, hardline } = doc.builders;

const inheritance = (
  node: AST.ContractDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
) =>
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
) => {
  const comments = printComments(node, path, options);
  return node.subNodes.length > 0 || comments.length
    ? printSeparatedItem(
        [printPreservingEmptyLines(path, 'subNodes', options, print), comments],
        { firstSeparator: hardline, grouped: false }
      )
    : '';
};

export const ContractDefinition: NodePrinter = {
  print: ({ node, options, path, print }) => [
    group([
      (node as AST.ContractDefinition).kind === 'abstract'
        ? 'abstract contract'
        : (node as AST.ContractDefinition).kind,
      ' ',
      (node as AST.ContractDefinition).name,
      inheritance(node as AST.ContractDefinition, path, print),
      '{'
    ]),
    body(node as AST.ContractDefinition, path, options, print),
    '}'
  ]
};
