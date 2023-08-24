import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { line } = doc.builders;

export const AssemblyLocalDefinition: NodePrinter<AST.AssemblyLocalDefinition> =
  {
    print: ({ node, path, print }) => {
      const parts = [
        'let',
        printSeparatedList(path.map(print, 'names'), { firstSeparator: line })
      ];

      if (node.expression !== null) {
        parts.push(':= ');
        parts.push(path.call(print, 'expression'));
      }

      return parts;
    }
  };
