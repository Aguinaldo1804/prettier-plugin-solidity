import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';
import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { group, hardline, indent, line } = doc.builders;

const modifierParameters = (
  node: AST.ModifierDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
) => {
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

const virtual = (node: AST.ModifierDefinition) =>
  node.isVirtual ? [line, 'virtual'] : '';

const override = (
  node: AST.ModifierDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
) => {
  if (!node.override) return '';
  if (node.override.length === 0) return [line, 'override'];
  return [
    line,
    'override(',
    printSeparatedList(path.map(print, 'override')),
    ')'
  ];
};

const body = (
  node: AST.ModifierDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
) => {
  if (!node.body) return ';';
  if (node.isVirtual) return group([' ', path.call(print, 'body')]);
  return [' ', path.call(print, 'body')];
};

export const ModifierDefinition: NodePrinter = {
  print: ({ node, path, print }) => [
    'modifier ',
    (node as AST.ModifierDefinition).name,
    modifierParameters(node as AST.ModifierDefinition, path, print),
    group(
      indent([
        virtual(node as AST.ModifierDefinition),
        override(node as AST.ModifierDefinition, path, print)
      ])
    ),
    body(node as AST.ModifierDefinition, path, print)
  ]
};
