import type { ParserOptions } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';

interface HandlerArguments {
  text: string;
  precedingNode?: AST.ASTNode;
  enclosingNode?: AST.ASTNode;
  followingNode?: AST.ASTNode;
  comment: AST.Comment;
  options: ParserOptions;
}
