import { doc } from 'prettier';
import { getNextNonSpaceNonCommentCharacter } from '../common/backward-compatibility.js';
import {
  printComments,
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type {
  FunctionDefinition as FunctionDefinitionType,
  NodePrinter
} from '../prettier-plugin-solidity';

const { dedent, group, indent, join, line } = doc.builders;

const functionName = (node: FunctionDefinitionType, options: ParserOptions) => {
  if (node.isConstructor && !node.name) return 'constructor';
  if (node.name) return `function ${node.name}`;
  if (node.isReceiveEther) return 'receive';
  // The parser doesn't give us any information about the keyword used for the
  // fallback.
  // Using the originalText is the next best option.
  // A neat idea would be to rely on the pragma and enforce it but for the
  // moment this will do.
  const names = { fallback: 'fallback', function: 'function' };
  const name = options.originalText.slice(
    options.locStart(node),
    options.locStart(node) + 8
  ) as 'fallback' | 'function';
  return names[name];
};

const parameters = (
  parametersType: 'parameters' | 'returnParameters',
  node: FunctionDefinitionType,
  path: AstPath,
  print: (path: AstPath) => Doc,
  options: ParserOptions
) => {
  const parametersArray = node[parametersType];

  if (parametersArray && parametersArray.length > 0) {
    return printSeparatedList(path.map(print, parametersType), {
      grouped: false
    });
  }
  if (node.comments && node.comments.length > 0) {
    // we add a check to see if the comment is inside the parentheses
    const parameterComments = printComments(
      node,
      path,
      options,
      (comment) =>
        getNextNonSpaceNonCommentCharacter(
          options.originalText,
          comment!,
          options.locEnd
        ) === ')'
    );
    return parameterComments.length > 0
      ? printSeparatedItem(parameterComments)
      : '';
  }
  return '';
};

const visibility = (node: FunctionDefinitionType) =>
  node.visibility && node.visibility !== 'default'
    ? [line, node.visibility]
    : '';

const virtual = (node: FunctionDefinitionType) =>
  node.isVirtual ? [line, 'virtual'] : '';

const override = (
  node: FunctionDefinitionType,
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

const stateMutability = (node: FunctionDefinitionType) =>
  node.stateMutability ? [line, node.stateMutability] : '';

const modifiers = (
  node: FunctionDefinitionType,
  path: AstPath,
  print: (path: AstPath) => Doc
) =>
  node.modifiers.length > 0
    ? [line, join(line, path.map(print, 'modifiers'))]
    : '';

const returnParameters = (
  node: FunctionDefinitionType,
  path: AstPath,
  print: (path: AstPath) => Doc,
  options: ParserOptions
) =>
  node.returnParameters
    ? [
        line,
        'returns (',
        group(parameters('returnParameters', node, path, print, options)),
        ')'
      ]
    : '';

const signatureEnd = (node: FunctionDefinitionType) =>
  node.body ? dedent(line) : ';';

const body = (
  node: FunctionDefinitionType,
  path: AstPath,
  print: (path: AstPath) => Doc
) => (node.body ? path.call(print, 'body') : '');

export const FunctionDefinition: NodePrinter = {
  print: ({ node, path, print, options }) => [
    group([
      functionName(node as FunctionDefinitionType, options),
      '(',
      parameters(
        'parameters',
        node as FunctionDefinitionType,
        path,
        print,
        options
      ),
      ')',
      indent(
        group([
          // TODO: sort comments for modifiers and return parameters
          printComments(node as FunctionDefinitionType, path, options),
          visibility(node as FunctionDefinitionType),
          stateMutability(node as FunctionDefinitionType),
          virtual(node as FunctionDefinitionType),
          override(node as FunctionDefinitionType, path, print),
          modifiers(node as FunctionDefinitionType, path, print),
          returnParameters(
            node as FunctionDefinitionType,
            path,
            print,
            options
          ),
          signatureEnd(node as FunctionDefinitionType)
        ])
      )
    ]),
    body(node as FunctionDefinitionType, path, print)
  ]
};
