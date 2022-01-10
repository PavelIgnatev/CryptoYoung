import { Request, Response } from "express";

export function testApi(req: Request, res: Response) {
  return res.status(200).json({'t': ';'});
}
