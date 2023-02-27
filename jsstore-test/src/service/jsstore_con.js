// import * as JsStore from "jsstore";
// import * as JsStoreWorker from "jsstore/dist/jsstore.worker.commonjs2";

// window["JsStoreWorker"] = JsStoreWorker;
// const workerPath = "../assets/jsstore.worker.js";
// export const connection = new JsStore.Connection(new Worker(workerPath));
// // connection.setLogStatus(true);

import * as JsStore from "jsstore";
import * as JsStoreWorker from "jsstore/dist/jsstore.worker.commonjs2";
window["JsStoreWorker"] = JsStoreWorker;
export const connection = new JsStore.Connection();

connection.setLogStatus(false);
