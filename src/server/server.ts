import express from "express";
import open from "open";

// import { TezosToolkit } from "@taquito/taquito";
// import { Call } from "./modules/call";
import { acc } from "./modules/call";
import { setupMiddlewares } from "./middlewares";
import { PORT } from "./config";
import { apiRouter, mainRouter } from "./router";
// import { Tx } from "./modules/tx";
// import { deploy } from "./modules/deploy";

const app = express();

// setup other
setupMiddlewares(app);

// api routes
app.use("/api", apiRouter);

// main routes
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Приложение успешно запущен на порту ${PORT}`);
  open(`http://localhost:${PORT}`);
});

// Deploy

// deploy();

// Change contract storage

const RPC_URL = "https://rpc.hangzhounet.teztnets.xyz";
const CONTRACT = "KT1TfcgreaNjC2YEqeMvRVzD7364RiNBjXvq"; //адрес опубликованного контракта
const ACC_BALANCE = acc.pkh;

const ADD = 10; //число, которое получит главная функция. Можете изменить его на другое
// new Call(RPC_URL).add(ADD, CONTRACT)

// // Activation of account

// new Tx('https://rpc.hangzhounet.teztnets.xyz').activateAccount()
