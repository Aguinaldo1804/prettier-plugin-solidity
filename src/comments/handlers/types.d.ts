import type { ASTNode, Comment } from '@solidity-parser/parser/src/ast-types';
import type { ParserOptions } from 'prettier';

interface HandlerArguments {
  text: string;
  precedingNode?: ASTNode;
  enclosingNode?: ASTNode;
  followingNode?: ASTNode;
  comment: Comment;
  options: ParserOptions;
}
