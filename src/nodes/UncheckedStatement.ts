import { doc } from 'prettier';
import type { AST, NodePrinter } from '../types';

const { group } = doc.builders;

export const UncheckedStatement: NodePrinter<AST.UncheckedStatement> = {
  print: ({ path, print }) => group(['unchecked ', path.call(print, 'block')])
};
