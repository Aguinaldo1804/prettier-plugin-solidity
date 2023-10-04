import { doc } from 'prettier';
import { printPreservingEmptyLines } from '../common/printer-helpers.js';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const { line } = doc.builders;

export const SourceUnit: NodePrinter<AST.SourceUnit> = {
  print: ({ options, path, print }) => [
    printPreservingEmptyLines(path, 'children', options, print),
    options.parentParser ? '' : line
  ]
};
