(function init(): void {
  let list = document.querySelector("ul");
  let db = null;
  let objectStore = null;
  const IDBOpenRequest = indexedDB.open("marksheetDB", 8);
  IDBOpenRequest.addEventListener("error", (e) => {});
  IDBOpenRequest.addEventListener("success", (e) => {
    console.log(e.target);
    db = e.target.result;
    console.log(db);
    getIDBObjects();
  });
  IDBOpenRequest.addEventListener("upgradeneeded", (e) => {
    db = e.target.result;
    console.log(db);
    if (!db.objectStoreNames.contains("marksheetStore")) {
      objectStore = db.createObjectStore("marksheetStore", {
        keyPath: "id",
        autoIncrement: true,
      });
    }
    if (db.objectStoreNames.contains("marksheetStore"))
      db.deleteObjectStore("marksheetStore");
  });

  document.getElementById("btn")?.addEventListener("click", (e) => {
    // const worker = new Worker("./worker.js");
    // worker.postMessage(db);
    trx({ name: "maths", marks: 98 });
  });
  function trx(obj) {
    let tx = db.transaction("marksheetStore", "readwrite");
    tx.oncomplete = (e) => {
      console.log("tx success");
      getIDBObjects();
    };
    tx.addEventListener("error", (e) => {
      console.log("tx error");
    });
    tx.addEventListener("abort", (e) => {
      console.log("tx abort");
    });
    let store = tx.objectStore("marksheetStore");
    let req = store.add(obj);
    req.onsuccess = (e) => {
      console.log("req success");
    };
  }
  function getIDBObjects() {
    let tx = db.transaction("marksheetStore", "readonly");
    tx.oncomplete = (e) => {
      console.log(e.target);
    };
    let store = tx.objectStore("marksheetStore");
    let getReq = store.getAll();
    getReq.onsuccess = (e) => {
      console.log(e.target.result);
      list?.innerHTML = e.target.result
        .map((object) => {
          return `<li data-key=${object.id}>${object.name}</li>`;
        })
        .join("\n");
    };
  }
  console.log(document.querySelector("ul"));
  document.querySelector("ul")?.addEventListener("click", function (e) {
    const key = e.target.getAttribute("data-key");
    let trx = db.transaction(["marksheetStore"], "readonly");
    let store = trx.objectStore("marksheetStore");
    let getReq = store.get(key);
    getReq.onsuccess = (e) => {
      let res = e.target.result;
      console.log(res);
      document.getElementById("clicked")?.innerHTML = `${res.id}`;
    };
  });
})();
