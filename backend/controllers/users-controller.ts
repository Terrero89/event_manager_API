import { Request, Response } from "express";

export const getUsersController = (req: Request, res: Response) => {
  res.send("GET USERS");
};
