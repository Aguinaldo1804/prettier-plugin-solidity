import * as nodes from './nodes/index.js';
import {
  getNode,
  hasNodeIgnoreComment,
  prettierVersionSatisfies
} from './common/util.js';
import ignoreComments from './comments/ignore.js';
import type { AstPath, Doc } from 'prettier';
import type { AST, ParserOptions } from './prettier-plugin-solidity';

let checked = false;

function prettierVersionCheck(): void {
  if (checked) return;
  if (!prettierVersionSatisfies('>=2.3.0')) {
    throw new Error(
      'The version of prettier in your node-modules does not satisfy the required ">=2.3.0" constraint. Please update the version of Prettier.'
    );
  }
  checked = true;
}

export default function genericPrint(
  path: AstPath,
  options: ParserOptions,
  print: (path: AstPath) => Doc
): Doc {
  prettierVersionCheck();

  const node = getNode(path) as AST.Node;
  if (node === null) {
    return '';
  }

  if (!(node.type in nodes)) {
    throw new Error(`Unknown type: ${JSON.stringify(node.type)}`);
  }

  if (hasNodeIgnoreComment(node)) {
    ignoreComments(path);

    return options.originalText.slice(
      options.locStart(node),
      options.locEnd(node) + 1
    );
  }

  // Since `node` is mutable and each printer has a specific type for it, the
  // typescript compiler determines `node` to be of type never.
  return nodes[node.type].print({ node: node as never, options, path, print });
}
