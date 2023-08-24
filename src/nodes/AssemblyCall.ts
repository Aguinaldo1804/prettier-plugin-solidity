import { printSeparatedList } from '../common/printer-helpers';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

export const AssemblyCall: NodePrinter = {
  print: ({ node, path, print, options }) =>
    (node as AST.AssemblyCall).arguments.length === 0 &&
    options.originalText.charAt(options.locEnd(node)) !== ')'
      ? (node as AST.AssemblyCall).functionName
      : [
          (node as AST.AssemblyCall).functionName,
          '(',
          printSeparatedList(path.map(print, 'arguments')),
          ')'
        ]
};
