import type { ParserOptions } from 'prettier';
import type { AST } from '../../types';

interface HandlerArguments {
  text: string;
  precedingNode?: AST.Node;
  enclosingNode?: AST.Node;
  followingNode?: AST.Node;
  comment: AST.Comment;
  options: ParserOptions;
}
