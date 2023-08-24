import { doc } from 'prettier';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { group } = doc.builders;

export const UncheckedStatement: NodePrinter<AST.UncheckedStatement> = {
  print: ({ path, print }) => group(['unchecked ', path.call(print, 'block')])
};
