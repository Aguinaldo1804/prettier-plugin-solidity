import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { Comment as IComment } from 'solidity-comments-extractor';

declare module 'prettier' {
  interface ParserOptions {
    compiler: string;
  }
}

interface NodePrinter<T> {
  print: (arg: {
    node: T;
    options: ParserOptions;
    path: AstPath;
    print: (path: AstPath) => Doc;
  }) => Doc;
}

declare module '@solidity-parser/parser/src/ast-types' {
  interface BaseComment extends IComment {
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
