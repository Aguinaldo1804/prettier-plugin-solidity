import { getNode } from '../common/util.js';
import type { AstPath } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';

export default function ignoreComments(path: AstPath): void {
  const node = getNode(path) as AST.ASTNode;
  // We ignore anything that is not an object
  if (node === null || typeof node !== 'object') return;

  const keys = Object.keys(node);
  keys.forEach((key) => {
    switch (key) {
      // We ignore `loc` and `range` since these are added by the parser
      case 'loc':
      case 'range':
        break;
      // The key `comments` will contain every comment for this node
      case 'comments':
        path.each((commentPath) => {
          const comment = getNode(commentPath) as AST.Comment;
          comment.printed = true;
        }, 'comments');
        break;
      default:
        // If the value for that key is an Array or an Object we go deeper.
        if (typeof node[key as keyof AST.ASTNode] === 'object') {
          if (Array.isArray(node[key as keyof AST.ASTNode])) {
            path.each(ignoreComments, key);
            return;
          }
          path.call(ignoreComments, key);
        }
    }
  });
}
