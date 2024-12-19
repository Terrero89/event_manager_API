import {Request, Response} from 'express';

const events = [{name: 'click', type: 'click'}, {name: 'hover', type: 'hover'}]
const logger = require('morgan');


export const getHomeController = (req: Request, res: Response) => {
    res.send("GET HOME PAGE")
};

export const getEventsController = (req: Request, res: Response) => {
    res.status(200).json({events})

};


module.exports = {
    getHomeController,
    getEventsController
}