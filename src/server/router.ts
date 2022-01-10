import path from "path";
import express, { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { api } from "./controllers/api";

const apiRouter = Router();

apiRouter.get("/", api.testApi);
apiRouter.get("/acc", api.testAcc);

//Не трогаем, react-приложение
const mainRouter = Router();

if (process.env.NODE_ENV === "production") {
  mainRouter.use(express.static(path.join(__dirname, "..", '..', "build")));
  mainRouter.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", '..', "build", "index.html"));
  });
} else {
  mainRouter.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
    })
  );
}

export { mainRouter, apiRouter };
