import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { line } = doc.builders;

export const AssemblyLocalDefinition: NodePrinter = {
  print: ({ node, path, print }) => {
    const parts = [
      'let',
      printSeparatedList(path.map(print, 'names'), { firstSeparator: line })
    ];

    if ((node as AST.AssemblyLocalDefinition).expression !== null) {
      parts.push(':= ');
      parts.push(path.call(print, 'expression'));
    }

    return parts;
  }
};
