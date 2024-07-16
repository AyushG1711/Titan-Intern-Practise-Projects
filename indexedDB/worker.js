self.addEventListener("message", (db) => {
  let obj = { name: "hindi", marks: 98 };
  let tx = db.transaction("marksheetStore", "readwrite");
  tx.oncomplete = (e) => {
    console.log("tx success");
  };
  tx.onerror = (e) => {
    console.log("tx success");
  };
  let store = tx.objectStore("marksheetStore");
  let req = store.add(obj);
  req.onsuccess = (e) => {
    console.log("req success");
  };
});
