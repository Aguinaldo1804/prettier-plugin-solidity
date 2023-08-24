import { doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { dedent, line } = doc.builders;

export const LabelDefinition: NodePrinter = {
  print: ({ node }) => [dedent(line), (node as AST.LabelDefinition).name, ':']
};
