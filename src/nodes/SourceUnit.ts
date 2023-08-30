import { doc } from 'prettier';
import { printPreservingEmptyLines } from '../common/printer-helpers.js';
import type { AST, NodePrinter } from '../types';

const { line } = doc.builders;

export const SourceUnit: NodePrinter<AST.SourceUnit> = {
  print: ({ options, path, print }) => [
    printPreservingEmptyLines(path, 'children', options, print),
    options.parentParser ? '' : line
  ]
};
