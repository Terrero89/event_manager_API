import {Request, Response} from 'express';


export const getStoriesController = (req: Request, res: Response) => {
    res.send("GET All STORIES")
};