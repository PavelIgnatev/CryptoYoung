import { json } from "express";

import rateLimiter from "express-rate-limit";
import slowDown from "express-slow-down";

import { disablePoweredBy } from "./disablePoweredBy";

const setupMiddlewares = (app: any) => {
  app.use(json());

  app.use(disablePoweredBy);

  const limiter = rateLimiter({
    windowMs: 1 * 60 * 1000,
    max: 120,
  });

  const speedLimiter = slowDown({
    windowMs: 1 * 60 * 1000,
    delayAfter: 100,
    delayMs: 1000,
  });

  app.use(limiter);
  app.use(speedLimiter);
};

export { setupMiddlewares };
