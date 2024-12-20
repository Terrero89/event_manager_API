"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksController = exports.getHomeController = void 0;
const events = [{ name: 'click', type: 'click' }, { name: 'hover', type: 'hover' }];
const logger = require('morgan');
const getHomeController = (req, res) => {
    res.send("GET HOME PAGE");
};
exports.getHomeController = getHomeController;
const getTasksController = (req, res) => {
    res.status(200).json({ events });
};
exports.getTasksController = getTasksController;
// export const getTaskController = (req: Request, res: Response) => {
//     const { id } = req.params; //grabbing id params from the request object
//     //?handling error if no id is found
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({ error: "Exam does not exist" });
//     }
//     const exam = await Exams.findById(id); //finding by specific id from params
//     //error handling for not id found
//     if (!exam) {
//       return res.status(404).json({ error: "NO EXAM FOUND" });
//     }
//     res.status(200).json(exam); //return that specific id from exam
//   };
module.exports = {
    getHomeController: exports.getHomeController,
    getTasksController: exports.getTasksController
};
