import {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment
} from '../prettier-comments/language-js/comments.js';
import handlers from './handlers/index.js';
import type { AstPath, ParserOptions } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';

export function solidityHandleOwnLineComment(
  comment: AST.Comment,
  text: string,
  options: ParserOptions,
  ast: AstPath,
  isLastComment: boolean
): boolean {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments = {
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment,
    options
  };

  if (
    handlers.some((handler) => handler(handlerArguments)) ||
    handleOwnLineComment(comment, text, options, ast, isLastComment)
  ) {
    return true;
  }
  return false;
}

export function solidityHandleEndOfLineComment(
  comment: AST.Comment,
  text: string,
  options: ParserOptions,
  ast: AstPath,
  isLastComment: boolean
): boolean {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments = {
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment,
    options
  };

  if (
    handlers.some((handler) => handler(handlerArguments)) ||
    handleEndOfLineComment(comment, text, options, ast, isLastComment)
  ) {
    return true;
  }
  return false;
}

export function solidityHandleRemainingComment(
  comment: AST.Comment,
  text: string,
  options: ParserOptions,
  ast: AstPath,
  isLastComment: boolean
): boolean {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments = {
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment,
    options
  };

  if (
    handlers.some((handler) => handler(handlerArguments)) ||
    handleRemainingComment(comment, text, options, ast, isLastComment)
  ) {
    return true;
  }
  return false;
}

export function isBlockComment(comment: AST.Comment): boolean {
  return comment.type === 'BlockComment';
}
