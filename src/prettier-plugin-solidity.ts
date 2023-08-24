import type * as Prettier from 'prettier';

import type * as AST from '@solidity-parser/parser/src/ast-types';

export const CommentTypes = ['BlockComment', 'LineComment'] as const;

export type CommentTypeString = (typeof CommentTypes)[number];

export interface BaseComment extends WithRange {
  type: CommentTypeString;
  range?: [number, number];
  loc?: Location;
  raw: string;
  value: string;
}

export interface BaseComment {
  leading: boolean;
  trailing: boolean;
  printed: boolean;
  precedingNode: ASTNode;
  enclosingNode: ASTNode;
  followingNode: ASTNode;
}

export interface WithRange {
  range?: [number, number];
}
export interface BlockComment extends BaseComment {
  type: 'BlockComment';
}
export interface LineComment extends BaseComment {
  type: 'LineComment';
}

export type Comment = BlockComment | LineComment;

export interface SourceUnit extends AST.SourceUnit {
  comments?: Comment[];
}
export interface UserDefinedTypeName extends AST.UserDefinedTypeName {
  comments?: Comment[];
}

export interface InheritanceSpecifier extends AST.InheritanceSpecifier {
  comments?: Comment[];
}

export interface ContractDefinition extends AST.ContractDefinition {
  comments?: Comment[];
}

export interface PragmaDirective extends AST.PragmaDirective {
  comments?: Comment[];
}
export interface StringLiteral extends AST.StringLiteral {
  comments?: Comment[];
}
export interface Identifier extends AST.Identifier {
  comments?: Comment[];
}

export interface ImportDirective extends AST.ImportDirective {
  comments?: Comment[];
}

export interface VariableDeclaration extends AST.VariableDeclaration {
  comments?: Comment[];
}
export interface StateVariableDeclarationVariable
  extends AST.StateVariableDeclarationVariable {
  comments?: Comment[];
}

export interface StateVariableDeclaration extends AST.StateVariableDeclaration {
  comments?: Comment[];
}
export interface FileLevelConstant extends AST.FileLevelConstant {
  comments?: Comment[];
}
export interface UsingForDeclaration extends AST.UsingForDeclaration {
  comments?: Comment[];
}
export interface StructDefinition extends AST.StructDefinition {
  comments?: Comment[];
}
export interface ModifierDefinition extends AST.ModifierDefinition {
  comments?: Comment[];
}
export interface ModifierInvocation extends AST.ModifierInvocation {
  comments?: Comment[];
}
export interface FunctionDefinition extends AST.FunctionDefinition {
  comments?: Comment[];
}

export interface CustomErrorDefinition extends AST.CustomErrorDefinition {
  comments?: Comment[];
}

export interface TypeDefinition extends AST.TypeDefinition {
  comments?: Comment[];
}

export interface RevertStatement extends AST.RevertStatement {
  comments?: Comment[];
}
export interface EventDefinition extends AST.EventDefinition {
  comments?: Comment[];
}
export interface EnumValue extends AST.EnumValue {
  comments?: Comment[];
}
export interface EnumDefinition extends AST.EnumDefinition {
  comments?: Comment[];
}
export interface ArrayTypeName extends AST.ArrayTypeName {
  comments?: Comment[];
}
export interface Mapping extends AST.Mapping {
  comments?: Comment[];
}
export interface FunctionTypeName extends AST.FunctionTypeName {
  comments?: Comment[];
}

export interface Block extends AST.Block {
  comments?: Comment[];
}
export interface ExpressionStatement extends AST.ExpressionStatement {
  comments?: Comment[];
  omitSemicolon?: boolean;
}
export interface IfStatement extends AST.IfStatement {
  comments?: Comment[];
}
export interface UncheckedStatement extends AST.UncheckedStatement {
  comments?: Comment[];
}
export interface TryStatement extends AST.TryStatement {
  comments?: Comment[];
}
export interface CatchClause extends AST.CatchClause {
  comments?: Comment[];
}
export interface WhileStatement extends AST.WhileStatement {
  comments?: Comment[];
}
export interface ForStatement extends AST.ForStatement {
  comments?: Comment[];
  initExpression: SimpleStatement | null;
  loopExpression: ExpressionStatement;
}
export interface InlineAssemblyStatement extends AST.InlineAssemblyStatement {
  comments?: Comment[];
}
export interface DoWhileStatement extends AST.DoWhileStatement {
  comments?: Comment[];
}
export interface ContinueStatement extends AST.ContinueStatement {
  comments?: Comment[];
}
export interface Break extends AST.Break {
  comments?: Comment[];
}
export interface Continue extends AST.Continue {
  comments?: Comment[];
}
export interface BreakStatement extends AST.BreakStatement {
  comments?: Comment[];
}
export interface ReturnStatement extends AST.ReturnStatement {
  comments?: Comment[];
}
export interface EmitStatement extends AST.EmitStatement {
  comments?: Comment[];
}
export interface ThrowStatement extends AST.ThrowStatement {
  comments?: Comment[];
}
export interface VariableDeclarationStatement
  extends AST.VariableDeclarationStatement {
  comments?: Comment[];
  omitSemicolon?: boolean;
}
export interface ElementaryTypeName extends AST.ElementaryTypeName {
  comments?: Comment[];
}
export interface FunctionCall extends AST.FunctionCall {
  comments?: Comment[];
}
export interface AssemblyBlock extends AST.AssemblyBlock {
  comments?: Comment[];
}
export interface AssemblyCall extends AST.AssemblyCall {
  comments?: Comment[];
}
export interface AssemblyLocalDefinition extends AST.AssemblyLocalDefinition {
  comments?: Comment[];
}
export interface AssemblyAssignment extends AST.AssemblyAssignment {
  comments?: Comment[];
}
export interface AssemblyStackAssignment extends AST.AssemblyStackAssignment {
  comments?: Comment[];
}
export interface LabelDefinition extends AST.LabelDefinition {
  comments?: Comment[];
}
export interface AssemblySwitch extends AST.AssemblySwitch {
  comments?: Comment[];
}
export interface AssemblyCase extends AST.AssemblyCase {
  comments?: Comment[];
}
export interface AssemblyFunctionDefinition
  extends AST.AssemblyFunctionDefinition {
  comments?: Comment[];
}
export interface AssemblyFor extends AST.AssemblyFor {
  comments?: Comment[];
}
export interface AssemblyIf extends AST.AssemblyIf {
  comments?: Comment[];
}
export interface AssemblyMemberAccess extends AST.AssemblyMemberAccess {
  comments?: Comment[];
}
export interface NewExpression extends AST.NewExpression {
  comments?: Comment[];
}
export interface TupleExpression extends AST.TupleExpression {
  comments?: Comment[];
}
export interface NameValueExpression extends AST.NameValueExpression {
  comments?: Comment[];
}
export interface NumberLiteral extends AST.NumberLiteral {
  comments?: Comment[];
}
export interface BooleanLiteral extends AST.BooleanLiteral {
  comments?: Comment[];
}
export interface HexLiteral extends AST.HexLiteral {
  comments?: Comment[];
}

export interface BinaryOperation extends AST.BinaryOperation {
  comments?: Comment[];
}
export interface UnaryOperation extends AST.UnaryOperation {
  comments?: Comment[];
}
export interface Conditional extends AST.Conditional {
  comments?: Comment[];
}
export interface IndexAccess extends AST.IndexAccess {
  comments?: Comment[];
}
export interface IndexRangeAccess extends AST.IndexRangeAccess {
  comments?: Comment[];
}
export interface MemberAccess extends AST.MemberAccess {
  comments?: Comment[];
}
export interface HexNumber extends AST.HexNumber {
  comments?: Comment[];
}
export interface DecimalNumber extends AST.DecimalNumber {
  comments?: Comment[];
}
export interface NameValueList extends AST.NameValueList {
  comments?: Comment[];
}

export type SimpleStatement =
  | VariableDeclarationStatement
  | ExpressionStatement;

export type AssemblyLiteral =
  | StringLiteral
  | BooleanLiteral
  | DecimalNumber
  | HexNumber
  | HexLiteral;

export type AssemblyExpression = AssemblyCall | AssemblyLiteral;
export type AssemblyItem =
  | Identifier
  | AssemblyBlock
  | AssemblyExpression
  | AssemblyLocalDefinition
  | AssemblyAssignment
  | AssemblyStackAssignment
  | LabelDefinition
  | AssemblySwitch
  | AssemblyFunctionDefinition
  | AssemblyFor
  | AssemblyIf
  | Break
  | Continue
  | NumberLiteral
  | StringLiteral
  | HexNumber
  | HexLiteral
  | DecimalNumber;
export type Statement =
  | IfStatement
  | WhileStatement
  | ForStatement
  | Block
  | InlineAssemblyStatement
  | DoWhileStatement
  | ContinueStatement
  | BreakStatement
  | ReturnStatement
  | EmitStatement
  | ThrowStatement
  | SimpleStatement
  | VariableDeclarationStatement
  | UncheckedStatement
  | TryStatement
  | RevertStatement;
export type TypeName =
  | ElementaryTypeName
  | UserDefinedTypeName
  | Mapping
  | ArrayTypeName
  | FunctionTypeName;
export type PrimaryExpression =
  | BooleanLiteral
  | HexLiteral
  | StringLiteral
  | NumberLiteral
  | Identifier
  | TupleExpression
  | TypeName;
export type Expression =
  | IndexAccess
  | IndexRangeAccess
  | TupleExpression
  | BinaryOperation
  | Conditional
  | MemberAccess
  | FunctionCall
  | UnaryOperation
  | NewExpression
  | PrimaryExpression
  | NameValueExpression;
export type ASTNode =
  | SourceUnit
  | PragmaDirective
  | ImportDirective
  | ContractDefinition
  | InheritanceSpecifier
  | StateVariableDeclaration
  | UsingForDeclaration
  | StructDefinition
  | ModifierDefinition
  | ModifierInvocation
  | FunctionDefinition
  | EventDefinition
  | CustomErrorDefinition
  | EnumValue
  | EnumDefinition
  | VariableDeclaration
  | UserDefinedTypeName
  | Mapping
  | ArrayTypeName
  | FunctionTypeName
  | Block
  | Statement
  | ElementaryTypeName
  | AssemblyBlock
  | AssemblyCall
  | AssemblyLocalDefinition
  | AssemblyAssignment
  | AssemblyStackAssignment
  | LabelDefinition
  | AssemblySwitch
  | AssemblyCase
  | AssemblyFunctionDefinition
  | AssemblyFor
  | AssemblyIf
  | AssemblyLiteral
  | TupleExpression
  | BinaryOperation
  | Conditional
  | IndexAccess
  | IndexRangeAccess
  | AssemblyItem
  | Expression
  | NameValueList
  | AssemblyMemberAccess
  | CatchClause
  | FileLevelConstant
  | TypeDefinition;

export interface ParserOptions extends Prettier.ParserOptions {
  compiler: string;
}

export interface NodePrinterArguments {
  node: ASTNode;
  options: ParserOptions;
  path: Prettier.AstPath;
  print: (path: Prettier.AstPath) => Prettier.Doc;
}

export interface NodePrinter {
  print: (arg: NodePrinterArguments) => Prettier.Doc;
}
