import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import type { ModifierDefinition as IModifierDefinition } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from '../types';

const { group, hardline, indent, line } = doc.builders;

const modifierParameters = (
  node: IModifierDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc => {
  if (node.parameters && node.parameters.length > 0) {
    return [
      '(',
      printSeparatedList(path.map(print, 'parameters'), {
        separator: [
          ',',
          // To keep consistency any list of parameters will split if it's longer than 2.
          // For more information see:
          // https://github.com/prettier-solidity/prettier-plugin-solidity/issues/256
          node.parameters.length > 2 ? hardline : line
        ]
      }),
      ')'
    ];
  }

  return '()';
};

const virtual = (node: IModifierDefinition): Doc =>
  node.isVirtual ? [line, 'virtual'] : '';

const override = (
  node: IModifierDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc => {
  if (!node.override) return '';
  return [
    line,
    'override',
    node.override.length === 0
      ? ''
      : ['(', printSeparatedList(path.map(print, 'override')), ')']
  ];
};

const body = (
  node: IModifierDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc => {
  if (!node.body) return ';';
  const document = [' ', path.call(print, 'body')];
  return node.isVirtual ? group(document) : document;
};

export const ModifierDefinition: NodePrinter<IModifierDefinition> = {
  print: ({ node, path, print }) => [
    'modifier ',
    node.name,
    modifierParameters(node, path, print),
    group(indent([virtual(node), override(node, path, print)])),
    body(node, path, print)
  ]
};
