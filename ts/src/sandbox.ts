// let a = { name: "ayush", class: 2, file: "quiz" };
// type t = keyof typeof a;
// type MyPick<T, K extends keyof T> = {
//   [key in K]: T[key];
// };
// type Todo = {
//   name: string;
//   payment: number;
// };
// type typ = {
//   a: Todo["name" | "payment"];
// };
// // a:num ,b:num, other will be of  types only
// type sign = {
//   a: number;
//   b: number;
//   [index: string]: number;
// };
// const user: sign = { a: 1, b: 2 };

// //readonly
// type Todo2 = {
//   name: string;
//   class: number;
// };
// type ReadOnly<T> = {
//   readonly [P in keyof T]: T[P];
// };
// const user2: ReadOnly<Todo2> = { name: "", class: 2 };

// //tuple to object
// const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
// type tttt = (typeof tuple)[number];
// // type t44 = typeof tuple;
// // type x = t44[number];
// type tupleToObject<T extends readonly string[]> = {
//   //type = "tesla"|"model3"|"model X"|"model Y"
//   [P in T[number]]: P;
// };
// type res = tupleToObject<typeof tuple>; //typeof tuple -> ["tesla","model 3", "model X", "model Y"]

// type arr1 = ["a", "b", "c"];
// type First<T extends string[]> = T[0];
// type t45 = First<arr1>;
// type f = arr1["length"];

// type MyExclude<T, P> = T extends P ? never : T;
// type t55 = MyExclude<"a" | "b" | "c", "a">;

// /*
// Promise<string>
// Promise<Promise<Promise<string|number>>>
// string
// */

// type MyAwaited<T> = T extends Promise<infer Inner>
//   ? Inner extends Promise<any>
//     ? MyAwaited<Inner>
//     : Inner
//   : T;
// const fun = () => {
//   return "fdfd";
// };
// type Type = MyAwaited<typeof fun>;
// type If<C extends true | false, T extends any, F extends any> = C extends true
//   ? T
//   : F;

// type A = If<true, "a", "b">; // expected to be 'a'
// type B = If<false, "a", "b">; // expected to be 'b'

// type Concat<A extends any[], B extends any[]> = [...A, ...B];
// type Result = Concat<[1], [2]>; // expected to be [1, 2]

// type Includes<A extends any[], B extends any> = B extends A[number]
//   ? true
//   : false;
// type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Santana">; // expected to be `false`

// type T1<T> = T extends "h" ? "true" : "false";

// type tj = T1<"h" | "i">;

//PUSH
// type Push<A extends any[], B extends any> = [...A, B]
// type t = Push<[1,2],'f'>

//UNSHIFT
// type Unshift<A extends any[], B> = [B, ...A];
// type t = Unshift<[1, 2], 0>;

//FUNCTION PARAMETERS TYPE
// const foo = (arg1: string, arg2: number): void => {};
// type FunctionParamsType<A extends (...arg: any[]) => any> = A extends (
//   ...arg: infer U
// ) => any
//   ? U
//   : never;
// type res = FunctionParamsType<typeof foo>;

//GET RETURN TYPE
// const fn = (v: boolean) => {
//   if (v) return 1;
//   else return "2";
// };
// type MyReturnType<A> = A extends (...arg:any[]) => infer U ? U : never;
// type r = MyReturnType<typeof fn>

//FIRST ARG OF FUNCTION
// type GetFirstArgument<T> = T extends (...args: infer U) => any
//   ? U["length"] extends 0
//     ? never
//     : U[0]
//   : never;
// const fun = (): void => {};
// type t = GetFirstArgument<typeof fun>;

//ARRAY TYPE
// type ArrayType<T> = T extends (infer U)[]?U:never;
// type t = ArrayType<[1,"f",{a:2}]>

//TUPLETOUNION
// type TupleToUnion<Arr extends any[]> = Arr[number];
// type Arr = ["1", "2", "3"];

// type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'

//
declare const config: Chainable;
type Chainable<P = {}> = {
  options<K extends string, V>(
    key: K,
    value: V
  ): Chainable<P & { [key in K]: V }>;
  get(): P;
};

type T = { foo: number; bar: number };
const fun = config.options("foo", 123).options("bar", 123).get();
console.log(fun);

//LAST OF ARRAY
// type arr = [1, 2, 3];
// type Last<arr extends any[]> = arr extends [...(infer T), infer k] ? k : never;
// type tail = Last<arr>;
