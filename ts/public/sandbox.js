"use strict";
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
const fun = config.options("foo", 123).options("bar", 123).get();
console.log(fun);
//LAST OF ARRAY
// type arr = [1, 2, 3];
// type Last<arr extends any[]> = arr extends [...(infer T), infer k] ? k : never;
// type tail = Last<arr>;
