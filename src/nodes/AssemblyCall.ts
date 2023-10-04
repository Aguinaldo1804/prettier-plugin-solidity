import { printSeparatedList } from '../common/printer-helpers.js';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const AssemblyCall: NodePrinter<AST.AssemblyCall> = {
  print: ({ node, path, print, options }) =>
    node.arguments.length === 0 &&
    options.originalText.charAt(options.locEnd(node)) !== ')'
      ? node.functionName
      : [
          node.functionName,
          '(',
          printSeparatedList(path.map(print, 'arguments')),
          ')'
        ]
};
