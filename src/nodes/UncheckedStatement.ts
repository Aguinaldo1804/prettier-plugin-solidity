import { doc } from 'prettier';
import type { UncheckedStatement as IUncheckedStatement } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const { group } = doc.builders;

export const UncheckedStatement: NodePrinter<IUncheckedStatement> = {
  print: ({ path, print }) => group(['unchecked ', path.call(print, 'block')])
};
