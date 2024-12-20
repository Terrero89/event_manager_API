import { Request, Response } from "express";

export const getUsersController = (req: Request, res: Response) => {
  res.send("GET USERS");
};

export const createUserController = (req: Request, res: Response) => {
  res.send("CREATE USER");
}
