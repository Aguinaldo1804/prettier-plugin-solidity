import { doc } from 'prettier';
import { printPreservingEmptyLines } from '../common/printer-helpers';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { line } = doc.builders;

export const SourceUnit: NodePrinter<AST.SourceUnit> = {
  print: ({ options, path, print }) => [
    printPreservingEmptyLines(path, 'children', options, print),
    options.parentParser ? '' : line
  ]
};
