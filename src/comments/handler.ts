import {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment
} from '../prettier-comments/language-js/comments.js';
import handlers from './handlers';
import type { AstPath, ParserOptions } from 'prettier';
import type { Comment } from '../prettier-plugin-solidity';

export function solidityHandleOwnLineComment(
  comment: Comment,
  text: string,
  options: ParserOptions,
  ast: AstPath,
  isLastComment: boolean
) {
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
  comment: Comment,
  text: string,
  options: ParserOptions,
  ast: AstPath,
  isLastComment: boolean
) {
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
  comment: Comment,
  text: string,
  options: ParserOptions,
  ast: AstPath,
  isLastComment: boolean
) {
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

export function isBlockComment(comment: Comment) {
  return comment.type === 'BlockComment';
}
