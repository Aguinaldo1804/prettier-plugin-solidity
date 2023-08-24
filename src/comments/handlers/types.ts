import type { ParserOptions } from 'prettier';
import type { ASTNode, Comment } from '../../prettier-plugin-solidity';

export interface HandlerArguments {
  text: string;
  precedingNode: ASTNode;
  enclosingNode: ASTNode;
  followingNode: ASTNode;
  comment: Comment;
  options: ParserOptions;
}
