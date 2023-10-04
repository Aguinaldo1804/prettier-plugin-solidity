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

  interface WithComments {
    comments?: Comment[];
  }

  interface SourceUnit extends WithComments {}

  interface UserDefinedTypeName extends WithComments {}

  interface InheritanceSpecifier extends WithComments {}

  interface ContractDefinition extends WithComments {}

  interface PragmaDirective extends WithComments {}

  interface StringLiteral extends WithComments {}

  interface Identifier extends WithComments {}

  interface ImportDirective extends WithComments {}

  interface VariableDeclaration extends WithComments {}

  interface StateVariableDeclarationVariable extends WithComments {}

  interface StateVariableDeclaration extends WithComments {}

  interface FileLevelConstant extends WithComments {}

  interface UsingForDeclaration extends WithComments {}

  interface StructDefinition extends WithComments {}

  interface ModifierDefinition extends WithComments {}

  interface ModifierInvocation extends WithComments {}

  interface FunctionDefinition extends WithComments {}

  interface CustomErrorDefinition extends WithComments {}

  interface TypeDefinition extends WithComments {}

  interface RevertStatement extends WithComments {}

  interface EventDefinition extends WithComments {}

  interface EnumValue extends WithComments {}

  interface EnumDefinition extends WithComments {}

  interface ArrayTypeName extends WithComments {}

  interface Mapping extends WithComments {}

  interface FunctionTypeName extends WithComments {}

  interface Block extends WithComments {}

  interface ExpressionStatement extends WithComments {
    omitSemicolon?: boolean;
  }

  interface IfStatement extends WithComments {}

  interface UncheckedStatement extends WithComments {}

  interface TryStatement extends WithComments {}

  interface CatchClause extends WithComments {}

  interface WhileStatement extends WithComments {}

  interface ForStatement extends WithComments {
    initExpression: SimpleStatement | null;
    loopExpression: ExpressionStatement;
  }

  interface InlineAssemblyStatement extends WithComments {}

  interface DoWhileStatement extends WithComments {}

  interface ContinueStatement extends WithComments {}

  interface Break extends WithComments {}

  interface Continue extends WithComments {}

  interface BreakStatement extends WithComments {}

  interface ReturnStatement extends WithComments {}

  interface EmitStatement extends WithComments {}

  interface ThrowStatement extends WithComments {}

  interface VariableDeclarationStatement extends WithComments {
    omitSemicolon?: boolean;
  }

  interface ElementaryTypeName extends WithComments {}

  interface FunctionCall extends WithComments {}

  interface AssemblyBlock extends WithComments {}

  interface AssemblyCall extends WithComments {}

  interface AssemblyLocalDefinition extends WithComments {}

  interface AssemblyAssignment extends WithComments {}

  interface AssemblyStackAssignment extends WithComments {}

  interface LabelDefinition extends WithComments {}

  interface AssemblySwitch extends WithComments {}

  interface AssemblyCase extends WithComments {}

  interface AssemblyFunctionDefinition extends WithComments {}

  interface AssemblyFor extends WithComments {}

  interface AssemblyIf extends WithComments {}

  interface AssemblyMemberAccess extends WithComments {}

  interface NewExpression extends WithComments {}

  interface TupleExpression extends WithComments {}

  interface NameValueExpression extends WithComments {}

  interface NumberLiteral extends WithComments {}

  interface BooleanLiteral extends WithComments {}

  interface HexLiteral extends WithComments {}

  interface BinaryOperation extends WithComments {}

  interface UnaryOperation extends WithComments {}

  interface Conditional extends WithComments {}

  interface IndexAccess extends WithComments {}

  interface IndexRangeAccess extends WithComments {}

  interface MemberAccess extends WithComments {}

  interface HexNumber extends WithComments {}

  interface DecimalNumber extends WithComments {}

  interface NameValueList extends WithComments {}
}
