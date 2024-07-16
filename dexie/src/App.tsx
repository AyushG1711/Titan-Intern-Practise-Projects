import React, { useEffect, useRef } from "react";
import "./App.css";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";
function App() {
  const marks = useRef(null);
  const data = useLiveQuery(() => {
    console.log("run");
    return db.friends.where({ marks: 70, phone: 22 }).first();
  }, []);
  const addFriend = async () => {
    const minCeiled = Math.ceil(60);
    const maxFloored = Math.floor(70);
    const m = Math.floor(
      Math.random() * (maxFloored - minCeiled + 1) + minCeiled
    );
    const a = Math.floor(
      Math.random() * (maxFloored - minCeiled + 1) + minCeiled
    );
    const p = Math.floor(
      Math.random() * (maxFloored - minCeiled + 1) + minCeiled
    );
    await db.transaction("rw", db.friends, async (trx) => {
      await db.friends.put({ idkd:32, marks: m, age: a, phone: p });
    });
  };
  console.log("changed");
  useEffect(() => {
    async function getData() {
      try {
        const req = await db.transaction("rw", db.friends, async (trx) => {
          // let id = await db.friends.add({ name: "a", age: 2 });
          // const newFriend = await db.friends.get({ id });
          // console.log(newFriend);
          // const collection = await db.friends
          //   .where("id")
          //   .above(12)
          //   .offset(1)
          //   .limit(1)
          //   .toArray();
          // console.log(collection);
          // const keys = await db.friends.orderBy("name").toArray();
          // console.log(keys);
          // const sorted = await db.friends.toCollection().reverse().sortBy("id");
          // console.log(sorted);
          //ORDERBY
          // const items = await db.friends.orderBy("name").toArray();
          // console.log(items);
          // const id = await db.friends.where("name").equals("a").delete();
          // console.log(id);
          //MULTIENTRY INDEX
          // const friend = await db.friends.add({ marks: [10, 3, 1] });
          // console.log(friend);
          // const items = await db.friends
          //   .toCollection()
          //   .filter((f) => f.marks.includes(2) && f.marks.includes(4))
          //   .toArray();
          // console.log(items);
          // try {
          //   return db.friends
          //     .where("marks")
          //     .equals(1)
          //     .distinct()
          //     .toArray()
          //     .then((friends) => {
          //       return new Promise((res, rej) => {
          //         res(1);
          //       });
          //     })
          //     .then(async (val) => {
          //       //RUNNING PERFECTLY
          //       // console.log(val);
          //       // return db.friends.where("marks").equals(2).toArray();
          //       const v = await Dexie.waitFor(
          //         new Promise((res, rej) => {
          //           setTimeout(() => {
          //             res(2);
          //           }, 5000);
          //         })
          //       );
          //       console.log(v);
          //     });
          // } catch (err) {
          //   console.log("in");
          // }
          // const res2 = await db.transaction("rw", db.friends, async () => {
          //   const r = await Dexie.waitFor(
          //     new Promise((res, rej) => {
          //       setTimeout(() => {
          //         res(2);
          //       }, 20000);
          //     })
          //   );
          //   console.log(r);
          // });
          // console.log(res2);
          // return await db.friends.put({ id: 1, marks: [1, 3, 2, 11] });
          // await db.friends.add({ marks: 70, age: 12, phone: 22 });
          await db.friends.add({ marks: 65, age: 14, phone: 22, idkd: 2323 });
          // console.log(await db.friends.where(":idkd").equals(1).first());
          // await db.friends.add({ marks: 61, age: 20, phone: 22 });
          // console.time("l1");
          // await db.friends.get({ marks: 70 });
          // console.timeEnd("l1");
          // console.time("l2");
          // console.log(await db.friends.where({ marks: 70 }).keys());
          // console.timeEnd("l2");
          // await db.friends.put({ marks: 34, age: 32, phone: 22, id: 23 });
          // const res = await db.friends
          //   .where("marks")
          //   .equals(34)
          //   .modify(function (friend) {
          //     this.value = { marks: 34, age: 222222, phone: 23232 };
          //   });
        });
        console.log(req);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);
  // c
  // console.log(data);
  return (
    <>
      <div>
        <ul>
          {/* {typeof data === "object" &&
            data.map((obj) => {
              return (
                <li data-key={obj.id}>
                  {obj.marks}
                  {obj.id}
                </li>
              );
            })} */}
          {data?.marks}
        </ul>
      </div>
      <div>
        <input ref={marks}></input>
      </div>
      <button onClick={addFriend}>Add</button>
    </>
  );
}

export default App;
