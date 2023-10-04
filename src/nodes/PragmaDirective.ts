import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const PragmaDirective: NodePrinter<AST.PragmaDirective> = {
  print: ({ node }) => ['pragma ', node.name, ' ', node.value, ';']
};
