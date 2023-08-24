import { doc } from 'prettier';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { group } = doc.builders;

export const UncheckedStatement: NodePrinter = {
  print: ({ path, print }) => group(['unchecked ', path.call(print, 'block')])
};
