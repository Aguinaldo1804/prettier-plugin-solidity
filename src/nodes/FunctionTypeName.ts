import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';

import type { AstPath, Doc } from 'prettier';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { group, indent, line } = doc.builders;

const returnTypes = (
  node: AST.FunctionTypeName,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.returnTypes.length > 0
    ? [
        line,
        'returns (',
        printSeparatedList(path.map(print, 'returnTypes')),
        ')'
      ]
    : '';

const visibility = (node: AST.FunctionTypeName): Doc =>
  node.visibility && node.visibility !== 'default'
    ? [line, node.visibility]
    : '';

const stateMutability = (node: AST.FunctionTypeName): Doc =>
  node.stateMutability && node.stateMutability !== 'default'
    ? [line, node.stateMutability]
    : '';

export const FunctionTypeName: NodePrinter<AST.FunctionTypeName> = {
  print: ({ node, path, print }) => [
    'function(',
    printSeparatedList(path.map(print, 'parameterTypes')),
    ')',
    indent(
      group([
        visibility(node),
        stateMutability(node),
        returnTypes(node, path, print)
      ])
    )
  ]
};
