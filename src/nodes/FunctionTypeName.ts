import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';

import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { group, indent, line } = doc.builders;

const returnTypes = (
  node: AST.FunctionTypeName,
  path: AstPath,
  print: (path: AstPath) => Doc
) =>
  node.returnTypes.length > 0
    ? [
        line,
        'returns (',
        printSeparatedList(path.map(print, 'returnTypes')),
        ')'
      ]
    : '';

const visibility = (node: AST.FunctionTypeName) =>
  node.visibility && node.visibility !== 'default'
    ? [line, node.visibility]
    : '';

const stateMutability = (node: AST.FunctionTypeName) =>
  node.stateMutability && node.stateMutability !== 'default'
    ? [line, node.stateMutability]
    : '';

export const FunctionTypeName: NodePrinter = {
  print: ({ node, path, print }) => [
    'function(',
    printSeparatedList(path.map(print, 'parameterTypes')),
    ')',
    indent(
      group([
        visibility(node as AST.FunctionTypeName),
        stateMutability(node as AST.FunctionTypeName),
        returnTypes(node as AST.FunctionTypeName, path, print)
      ])
    )
  ]
};
