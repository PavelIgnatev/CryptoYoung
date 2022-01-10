import { testAccount } from './../../../shared/constants/testAccount';
import { Request, Response } from "express";


export function testAcc(req: Request, res: Response) {
  return res.status(200).json(testAccount);
}
