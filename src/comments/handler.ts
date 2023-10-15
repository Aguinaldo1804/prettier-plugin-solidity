import {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment
} from '../prettier-comments/language-js/comments.js';
import handlers from './handlers/index.js';
import type {
  Comment,
  BlockComment
} from '@solidity-parser/parser/src/ast-types';
import type { AstPath, ParserOptions } from 'prettier';

export function solidityHandleOwnLineComment(
  comment: Comment,
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
  comment: Comment,
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
  comment: Comment,
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

export function isBlockComment(comment: Comment): comment is BlockComment {
  return comment.type === 'BlockComment';
}

export function canAttachComment(node: Comment): boolean {
  return (
    node.type && node.type !== 'BlockComment' && node.type !== 'LineComment'
  );
}
