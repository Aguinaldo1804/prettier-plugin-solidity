import { doc, util } from 'prettier';
import { getNode } from '../common/util.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AST } from '../types';

const { hardline, join } = doc.builders;

function isIndentableBlockComment(comment: AST.Comment): boolean {
  // If the comment has multiple lines and every line starts with a star
  // we can fix the indentation of each line. The stars in the `/*` and
  // `*/` delimiters are not included in the comment value, so add them
  // back first.
  const lines = `*${comment.raw}*`.split('\n');
  return lines.length > 1 && lines.every((line) => line.trim()[0] === '*');
}

function printIndentableBlockComment(comment: AST.Comment): Doc {
  const lines = comment.raw.split('\n');

  return [
    '/*',
    join(
      hardline,
      lines.map((line, index) =>
        index === 0
          ? line.trimEnd()
          : ` ${index < lines.length - 1 ? line.trim() : line.trimStart()}`
      )
    ),
    '*/'
  ];
}

export function printComment(
  commentPath: AstPath,
  options: ParserOptions
): Doc {
  const comment = getNode(commentPath) as AST.Comment;

  switch (comment.type) {
    case 'BlockComment': {
      if (isIndentableBlockComment(comment)) {
        const printed = printIndentableBlockComment(comment);
        // We need to prevent an edge case of a previous trailing comment
        // printed as a `lineSuffix` which causes the comments to be
        // interleaved. See https://github.com/prettier/prettier/issues/4412
        if (
          comment.trailing &&
          !util.hasNewline(options.originalText, options.locStart(comment), {
            backwards: true
          })
        ) {
          return [hardline, printed];
        }
        return printed;
      }

      return `/*${comment.raw}*/`;
    }
    case 'LineComment':
      return `//${comment.raw.trimEnd()}`;
    default:
      throw new Error(`Not a comment: ${JSON.stringify(comment)}`);
  }
}
