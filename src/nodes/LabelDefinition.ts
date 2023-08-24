import { doc } from 'prettier';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { dedent, line } = doc.builders;

export const LabelDefinition: NodePrinter<AST.LabelDefinition> = {
  print: ({ node }) => [dedent(line), node.name, ':']
};
