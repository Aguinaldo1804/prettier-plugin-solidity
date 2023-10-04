import { doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const { dedent, line } = doc.builders;

export const LabelDefinition: NodePrinter<AST.LabelDefinition> = {
  print: ({ node }) => [dedent(line), node.name, ':']
};
