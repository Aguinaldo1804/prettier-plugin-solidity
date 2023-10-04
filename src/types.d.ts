import type * as Extracted from 'solidity-comments-extractor';
import type * as Prettier from 'prettier';

declare module 'prettier' {
  interface ParserOptions {
    compiler: string;
  }
}

interface NodePrinter<T> {
  print: (arg: {
    node: T;
    options: Prettier.ParserOptions;
    path: Prettier.AstPath;
    print: (path: Prettier.AstPath) => Prettier.Doc;
  }) => Prettier.Doc;
}

declare module '@solidity-parser/parser/src/ast-types' {
  interface BaseComment extends Extracted.Comment {
    leading?: boolean;
    trailing?: boolean;
    printed?: boolean;
    precedingNode?: ASTNode;
    enclosingNode?: ASTNode;
    followingNode?: ASTNode;
  }

  export interface BlockComment extends BaseComment {
    type: 'BlockComment';
  }

  export interface LineComment extends BaseComment {
    type: 'LineComment';
  }

  export type Comment = BlockComment | LineComment;

  interface BaseASTNode {
    comments?: Comment[];
  }

  interface ExpressionStatement {
    omitSemicolon?: boolean;
  }

  interface VariableDeclarationStatement {
    omitSemicolon?: boolean;
  }
}
