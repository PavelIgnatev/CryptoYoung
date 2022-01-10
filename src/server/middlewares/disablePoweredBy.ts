import { Request, Response, NextFunction } from "express";

function disablePoweredBy(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.removeHeader("X-Powered-By");
  next();
}
export { disablePoweredBy };
