import { util } from 'prettier';
import { prettierVersionSatisfies } from './util.js';
import type { AstPath } from 'prettier';
import type { utilV2 } from './types';
import type { AST } from '../prettier-plugin-solidity';

export const isPrettier2 = prettierVersionSatisfies('^2.3.0');

// The functions in this file will never be 100% covered in a single run
// since it depends on the version of Prettier being used.
// Mocking the behaviour will introduce a lot of maintenance in the tests.
export function isNextLineEmpty(text: string, startIndex: number): boolean {
  return isPrettier2
    ? (util as utilV2).isNextLineEmptyAfterIndex(text, startIndex)
    : util.isNextLineEmpty(text, startIndex); // V3 deprecated `isNextLineEmptyAfterIndex`
}

export function getNextNonSpaceNonCommentCharacterIndex(
  text: string,
  node: AST.Node,
  locEnd: (node: AST.Node) => number
): number | false {
  return isPrettier2
    ? (util as utilV2).getNextNonSpaceNonCommentCharacterIndex(
        text,
        node,
        locEnd
      )
    : util.getNextNonSpaceNonCommentCharacterIndex(text, locEnd(node)); // V3 signature changed
}

export function getNextNonSpaceNonCommentCharacter(
  text: string,
  node: AST.Node | AST.Comment,
  locEnd: (node: AST.Node | AST.Comment) => number
): string {
  if (isPrettier2) {
    const index = (util as utilV2).getNextNonSpaceNonCommentCharacterIndex(
      text,
      node,
      locEnd
    );
    return index === false ? '' : text.charAt(index);
  }
  return util.getNextNonSpaceNonCommentCharacter(text, locEnd(node)); // V3 exposes this function directly
}

export const getNode = (path: AstPath): AST.Node | AST.Comment =>
  (isPrettier2 ? path.getValue() : path.node) as AST.Node | AST.Comment; // V3 deprecated `getValue`

export function isLast(path: AstPath, key: string, index: number) {
  return isPrettier2
    ? index === path.getParentNode()[key].length - 1
    : path.isLast;
}
