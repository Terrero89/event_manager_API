import {Request, Response} from 'express';


export const getTasksController = (req: Request, res: Response) => {
    res.send("GET TASKS")
};