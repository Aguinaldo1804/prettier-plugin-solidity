import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const PragmaDirective: NodePrinter<AST.PragmaDirective> = {
  print: ({ node }) => ['pragma ', node.name, ' ', node.value, ';']
};
