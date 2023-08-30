import type { AST, NodePrinter } from '../types';

export const PragmaDirective: NodePrinter<AST.PragmaDirective> = {
  print: ({ node }) => ['pragma ', node.name, ' ', node.value, ';']
};
