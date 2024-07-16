(function init() {
    var _a, _b;
    var list = document.querySelector("ul");
    var db = null;
    var objectStore = null;
    var IDBOpenRequest = indexedDB.open("marksheetDB", 8);
    IDBOpenRequest.addEventListener("error", function (e) { });
    IDBOpenRequest.addEventListener("success", function (e) {
        console.log(e.target);
        db = e.target.result;
        console.log(db);
        getIDBObjects();
    });
    IDBOpenRequest.addEventListener("upgradeneeded", function (e) {
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
    (_a = document.getElementById("btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
        // const worker = new Worker("./worker.js");
        // worker.postMessage(db);
        trx({ name: "maths", marks: 98 });
    });
    function trx(obj) {
        var tx = db.transaction("marksheetStore", "readwrite");
        tx.oncomplete = function (e) {
            console.log("tx success");
            getIDBObjects();
        };
        tx.addEventListener("error", function (e) {
            console.log("tx error");
        });
        tx.addEventListener("abort", function (e) {
            console.log("tx abort");
        });
        var store = tx.objectStore("marksheetStore");
        var req = store.add(obj);
        req.onsuccess = function (e) {
            console.log("req success");
        };
    }
    function getIDBObjects() {
        var tx = db.transaction("marksheetStore", "readonly");
        tx.oncomplete = function (e) {
            console.log(e.target);
        };
        var store = tx.objectStore("marksheetStore");
        var getReq = store.getAll();
        getReq.onsuccess = function (e) {
            console.log(e.target.result);
            list === null || list === void 0 ? void 0 : list.innerHTML = e.target.result
                .map(function (object) {
                return "<li data-key=".concat(object.id, ">").concat(object.name, "</li>");
            })
                .join("\n");
        };
    }
    console.log(document.querySelector("ul"));
    (_b = document.querySelector("ul")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (e) {
        var key = e.target.getAttribute("data-key");
        var trx = db.transaction(["marksheetStore"], "readonly");
        var store = trx.objectStore("marksheetStore");
        var getReq = store.get(key);
        getReq.onsuccess = function (e) {
            var _a;
            var res = e.target.result;
            console.log(res);
            (_a = document.getElementById("clicked")) === null || _a === void 0 ? void 0 : _a.innerHTML = "".concat(res.id);
        };
    });
})();
