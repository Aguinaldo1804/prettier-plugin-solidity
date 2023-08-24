import { printSeparatedList } from '../common/printer-helpers';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

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
